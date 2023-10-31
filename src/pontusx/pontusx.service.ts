import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Network,
  NETWORK_CONFIGS,
  NetworkConfig,
  PRICING_CONFIGS,
  PricingConfig,
} from './config';
import { Wallet, providers } from 'ethers';
import {
  LogLevel,
  Nautilus,
  AssetBuilder,
  FileTypes,
  ServiceBuilder,
  ServiceTypes,
  UrlFile,
  NautilusDDO,
  LifecycleStates,
} from 'nautilus';
import {
  CreateOfferingRequest,
  UpdateOfferingRequest,
} from 'src/generated/src/_proto/spp';
import { CredentialEventServiceService } from 'src/credential-event-service/credential-event-service.service';
import { RpcException } from '@nestjs/microservices';
import { status as GrpcStatusCode } from '@grpc/grpc-js';

@Injectable()
export class PontusxService implements OnModuleInit {
  private readonly logger = new Logger(PontusxService.name);
  private readonly selectedNetwork: string;
  private readonly networkConfig: NetworkConfig;
  private readonly pricingConfig: PricingConfig;
  private readonly wallet: Wallet;
  private nautilus: Nautilus;
  private logLevel: LogLevel = LogLevel.Verbose;

  constructor(
    private readonly configService: ConfigService,
    private readonly credentialEventService: CredentialEventServiceService,
  ) {
    this.selectedNetwork = this.configService
      .getOrThrow('NETWORK')
      .toUpperCase();

    if (!(this.selectedNetwork in Network)) {
      this.logger.error(
        `Invalid network selection: ${
          this.selectedNetwork
        }. Supported networks are ${Object.values(Network).join(', ')}.`,
      );
      throw `Invalid network selection: ${
        this.selectedNetwork
      }. Supported networks are ${Object.values(Network).join(', ')}.`;
    }
    this.networkConfig = NETWORK_CONFIGS[this.selectedNetwork];
    this.pricingConfig = PRICING_CONFIGS[this.selectedNetwork];
    const provider = new providers.JsonRpcProvider(this.networkConfig.nodeUri);

    this.wallet = new Wallet(
      this.configService.getOrThrow('PRIVATE_KEY'),
      provider,
    );
  }

  async onModuleInit(): Promise<void> {
    this.nautilus = await Nautilus.create(this.wallet, this.networkConfig);
    Nautilus.setLogLevel(this.logLevel);
  }

  getSelectedNetwork() {
    return this.selectedNetwork;
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  async publishComputeAsset(offering: CreateOfferingRequest) {
    this.logger.debug('VC from pontusx publishing:', offering);

    const owner = await this.wallet.getAddress();
    this.logger.debug(`Your address is ${owner}`);

    const serviceBuilder = new ServiceBuilder({
      serviceType: ServiceTypes.COMPUTE,
      fileType: FileTypes.URL,
    }); // compute type dataset with URL data source

    serviceBuilder
      .setServiceEndpoint(this.networkConfig.providerUri)
      .setTimeout(86400)
      .setPricing(this.pricingConfig['FIXED_EUROE'])
      .setDatatokenNameAndSymbol(offering.name, offering.token) // important for following access token transactions in the explorer
      .allowRawAlgorithms(false);
    //.addConsumerParameter(cunsumerParameter) // optional

    offering.main.files?.forEach((file) => {
      const urlFile: UrlFile = {
        type: 'url',
        url: file.url, // link to your file or api
        method: file.method,
        index: file.index,
        // headers: {
        //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
        // }
      };
      serviceBuilder.addFile(urlFile);
    });
    offering.main.allowedAlgorithm?.forEach((algorithm) => {
      serviceBuilder.addTrustedAlgorithm(algorithm);
    });
    const service = serviceBuilder.build();

    if (offering.main.type !== 'dataset') {
      throw new Error('Incopatible type of offering!');
    }

    const assetBuilder = new AssetBuilder();
    const asset = assetBuilder
      .setType(<'dataset'>offering.main.type)
      .setName(offering.name)
      .setDescription(offering.main.description)
      .setAuthor(offering.main.author)
      .setLicense(offering.main.licence)
      .setContentLanguage('de')
      .addTags(offering.main.tags)
      .addService(service)
      .setOwner(owner)
      .addAdditionalInformation(offering.additionalInformation)
      .build();

    const result = await this.nautilus.publish(asset);
    return result;
  }

  async updateOffering(offeringRequest: UpdateOfferingRequest) {
    const { nautilusDDO, aquariusAsset } = await this.retrieveFromDid(
      offeringRequest.did,
    );

    const theOneService = await this.getTheOneService(nautilusDDO);

    const serviceBuilder = new ServiceBuilder({
      aquariusAsset,
      serviceId: theOneService.id,
    });

    serviceBuilder.setDatatokenNameAndSymbol(
      offeringRequest.name,
      offeringRequest.token,
    ); // important for following access token transactions in the explorer

    offeringRequest.main.files?.forEach((file) => {
      const urlFile: UrlFile = {
        type: 'url',
        url: file.url, // link to your file or api
        method: file.method,
        index: file.index,
        // headers: {
        //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
        // }
      };
      serviceBuilder.addFile(urlFile);
    });
    offeringRequest.main.allowedAlgorithm?.forEach((algorithm) => {
      serviceBuilder.addTrustedAlgorithm(algorithm);
    });

    const service = serviceBuilder.build();

    const assetBuilder = new AssetBuilder({ aquariusAsset, nautilusDDO });

    if (offeringRequest.main.type !== 'dataset') {
      throw new Error('Incopatible type of offering!');
    }

    const asset = assetBuilder
      .setType(<'dataset'>offeringRequest.main.type)
      .setName(offeringRequest.name)
      .setDescription(offeringRequest.main.description)
      .setAuthor(offeringRequest.main.author)
      .setLicense(offeringRequest.main.licence)
      .setContentLanguage('de')
      .addTags(offeringRequest.main.tags) // remove tags first
      .addService(service)
      .addAdditionalInformation(offeringRequest.additionalInformation)
      .build();

    const result = await this.nautilus.edit(asset);

    let cesResult;
    if (offeringRequest.publishInfo) {
      cesResult = await this.credentialEventService.publish(
        offeringRequest.publishInfo.source,
        JSON.parse(offeringRequest.publishInfo.data),
      );
    }

    return {
      pontus: result,
      ces: cesResult,
    };
  }

  async setState(did: string, state: LifecycleStates) {
    const { aquariusAsset, nautilusDDO } = await this.retrieveFromDid(did);
    const assetBuilder = new AssetBuilder({ aquariusAsset, nautilusDDO });
    const asset = assetBuilder.setLifecycleState(state).build();
    return await this.nautilus.edit(asset);
  }

  private async retrieveFromDid(did: string) {
    let aquariusAsset, nautilusDDO;
    try {
      const res = await NautilusDDO.createFromDID(did, this.nautilus);
      aquariusAsset = res.aquariusAsset;
      nautilusDDO = res.nautilusDDO;
    } catch (err) {
      throw new RpcException({
        code: GrpcStatusCode.NOT_FOUND,
        message: err.message,
      });
    }
    return { nautilusDDO, aquariusAsset };
  }

  async getTheOneService(nautilusDDO: NautilusDDO) {
    const ddo = await nautilusDDO.getDDO();
    if (ddo.services.length !== 1) {
      throw new RpcException({
        code: GrpcStatusCode.UNIMPLEMENTED,
        message: 'We can only handle DDOs with exactly one service.',
      });
    }
    return ddo.services[0];
  }
}
