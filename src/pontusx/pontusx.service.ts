import { Injectable, Logger } from '@nestjs/common';
import {
  Network,
  NETWORK_CONFIGS,
  NetworkConfig,
  PRICING_CONFIGS,
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
  PricingConfig,
} from '@deltadao/nautilus';
import { JsonOffering, Offering } from 'src/generated/src/_proto/spp';

@Injectable()
export class PontusxService {
  private readonly logger = new Logger(PontusxService.name);
  private readonly selectedNetwork: string;
  private readonly networkConfig;
  private readonly pricingConfig;
  private readonly wallet: Wallet;
  private logLevel: LogLevel = LogLevel.Verbose;

  constructor(privateKey: string, selNetwork: string) {
    this.selectedNetwork = selNetwork.toUpperCase();
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
    this.wallet = new Wallet(privateKey, provider);
  }

  getSelectedNetwork() {
    return this.selectedNetwork;
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  async publishComputeAsset(offering: Offering) {
    this.logger.debug('VC from pontusx publishing:', offering);
    Nautilus.setLogLevel(this.logLevel);
    const nautilus = await Nautilus.create(this.wallet, this.networkConfig);

    const owner = await this.wallet.getAddress();
    this.logger.debug(`Your address is ${owner}`);

    //ToolCondition-Algorithm
    const trustedAlgo1 = {
      did: 'did:op:bd74d6a281ba414de2b4d8ee4087277575f95676bd74e20ee9e2960c9c38d7c5',
      filesChecksum:
        'e824e61f496db857b88c44a62670a8162e9cca2a21dcbdf0990f92f07fada0f4', //Hash of algorithm's files section
      containerSectionChecksum:
        '8f7e42a9529e57f6d4c198a23bb26461be7d36873b2d4ccaeedaf2e36f492541',
    };
    //CO2-Estimate Algorithm
    const trustedAlgo2 = {
      did: 'did:op:a3da777fd3711da36d5e1e5904a8c074b6e8df51549db2b6c8a5bc7ec3ab60cf',
      filesChecksum:
        'e824e61f496db857b88c44a62670a8162e9cca2a21dcbdf0990f92f07fada0f4',
      containerSectionChecksum:
        '0bc95cdfec91541042d6847c82af4401261fcff633d41d9fba8e612760d77996',
    };

    const serviceBuilder = new ServiceBuilder(
      ServiceTypes.COMPUTE,
      FileTypes.URL,
    ); // compute type dataset with URL data source

    serviceBuilder
      .setServiceEndpoint(this.networkConfig.providerUri)
      .setTimeout(86400)
      .setPricing(this.pricingConfig.FIXED_EUROE)
      .setDatatokenNameAndSymbol(offering.name, offering.token) // important for following access token transactions in the explorer
      .addTrustedAlgorithm(trustedAlgo1)
      .addTrustedAlgorithm(trustedAlgo2)
      .allowRawAlgorithms(false);
    //.addConsumerParameter(cunsumerParameter) // optional

    offering.main.files.forEach((file) => {
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
    offering.allowedAlgorithm.forEach((algorithm) => {
      serviceBuilder.addTrustedAlgorithm(algorithm);
    });
    const service = serviceBuilder.build();

    if (offering.main.type !== 'dataset') {
      throw new Error('Incopatible type of offering!');
    }

    const assetBuilder = new AssetBuilder();
    const asset = assetBuilder
      .setType(<'dataset'>offering.main.type)
      .setName(offering.main.name)
      .setDescription(offering.main.description)
      .setAuthor(offering.main.author)
      .setLicense(offering.main.licence)
      .setContentLanguage('de')
      .addTags(offering.main.tags)
      .addService(service)
      .setOwner(owner)
      .addAdditionalInformation(offering.additionalInformation)
      .build();

    const result = await nautilus.publish(asset);
    return result;
  }
}
