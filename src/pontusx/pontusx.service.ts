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
  LifecycleStates,
} from '@deltadao/nautilus';
import {
  CreateOfferingRequest,
  UpdateOfferingRequest,
} from '../generated/src/_proto/spp';
import { CredentialEventServiceService } from '../credential-event-service/credential-event-service.service';
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
    if (offering.main.allowedAlgorithm?.length) {
      serviceBuilder.addTrustedAlgorithms(
        offering.main.allowedAlgorithm.map((algo) => ({ did: algo.did })),
      );
    }
    const service = serviceBuilder.build();

    if (offering.main.type !== 'dataset') {
      throw new Error('Incompatible type of offering!');
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
    const aquariusAsset = await this.nautilus.getAquariusAsset(
      offeringRequest.did,
    );

    const assetBuilder = new AssetBuilder(aquariusAsset);

    const services: Array<number> = [];
    offeringRequest.index?.forEach((ind) => {
      if (ind in aquariusAsset.services) {
        services.push(ind);
      } else {
        throw new RpcException({
          code: GrpcStatusCode.OUT_OF_RANGE,
          message: `The requested service index ${ind} is out of range of the existing services of the asset`,
        });
      }
    });
    if (!services.length) {
      for (let i = 0; i < aquariusAsset.services.length; i++) {
        services.push(i);
      }
      this.logger.debug(
        `Updating all services of asset ${offeringRequest.did} ...`,
      );
    } else {
      this.logger.debug(
        `Updating services with indices ${services} of asset ${offeringRequest.did} ...`,
      );
    }

    for (const ind of services) {
      const serviceBuilder = new ServiceBuilder({
        aquariusAsset,
        serviceId: aquariusAsset.services[ind].id,
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

      if (offeringRequest.main.allowedAlgorithm?.length) {
        serviceBuilder.addTrustedAlgorithms(
          offeringRequest.main.allowedAlgorithm.map((algo) => ({
            did: algo.did,
          })),
        );
      }

      const service = serviceBuilder.build();
      assetBuilder.addService(service);
    }

    if (offeringRequest.main.type !== 'dataset') {
      throw new RpcException({
        code: GrpcStatusCode.UNIMPLEMENTED,
        message: 'We can only handle datasets for now',
      });
    }

    if (offeringRequest?.main) {
      assetBuilder
        .setType(<'dataset'>offeringRequest.main.type)
        .setDescription(offeringRequest.main.description)
        .setAuthor(offeringRequest.main.author)
        .setLicense(offeringRequest.main.licence)
        .addTags(offeringRequest.main.tags);
    }
    if (offeringRequest?.additionalInformation) {
      assetBuilder.addAdditionalInformation(
        offeringRequest.additionalInformation,
      );
    }
    const asset = assetBuilder.build();

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
    const aquariusAsset = await this.nautilus.getAquariusAsset(did);

    const result = await this.nautilus.setAssetLifecycleState(
      aquariusAsset,
      state,
    );

    return result;
  }
}
