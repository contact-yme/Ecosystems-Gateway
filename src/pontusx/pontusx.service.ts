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
} from 'nautilus';
import { Offering } from 'src/generated/src/_proto/spp';

@Injectable()
export class PontusxService implements OnModuleInit {
  private readonly logger = new Logger(PontusxService.name);
  private readonly selectedNetwork: string;
  private readonly networkConfig: NetworkConfig;
  private readonly pricingConfig: PricingConfig;
  private readonly wallet: Wallet;
  private nautilus: Nautilus;
  private logLevel: LogLevel = LogLevel.Verbose;

  constructor(private readonly configService: ConfigService) {
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

  async publishComputeAsset(offering: Offering) {
    this.logger.debug('VC from pontusx publishing:', offering);

    const owner = await this.wallet.getAddress();
    this.logger.debug(`Your address is ${owner}`);

    let serviceBuilder;
    let aquariusAsset;
    let nautilusDDO;

    if (offering.did && offering.did?.trim().length !== 0) {
      const fromDid = await NautilusDDO.createFromDID(
        offering.did, // 'did:op:5c7a3b65a01240b5b18e6cc7ca0d652a4932a032111c2b7a98149a4602354296',
        this.nautilus,
      );
      aquariusAsset = fromDid.aquariusAsset;
      nautilusDDO = fromDid.nautilusDDO;

      if (offering.serviceId && offering.serviceId?.trim().length !== 0) {
        if (!this.serviceExistsOnDDO(nautilusDDO, offering.serviceId)) {
          throw new Error(`ServiceID (${offering.serviceId}) not found on ddo`);
        }
      } else {
        serviceBuilder = new ServiceBuilder({
          aquariusAsset,
          serviceId: offering.serviceId,
        });
      }
    } else {
      serviceBuilder = new ServiceBuilder({
        serviceType: ServiceTypes.COMPUTE,
        fileType: FileTypes.URL,
      }); // compute type dataset with URL data source
    }

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

    let assetBuilder;
    if (offering.did?.trim().length !== 0) {
      assetBuilder = new AssetBuilder({ aquariusAsset, nautilusDDO });
    } else {
      assetBuilder = new AssetBuilder();
    }
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

  private serviceExistsOnDDO(nautilusDDO: any, serviceID: string) {
    return nautilusDDO.services.map((s) => s.id).includes(serviceID);
  }
}
