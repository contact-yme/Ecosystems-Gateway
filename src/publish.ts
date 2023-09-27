import {
  AssetBuilder,
  ConsumerParameterBuilder,
  FileTypes,
  Nautilus,
  ServiceBuilder,
  ServiceTypes,
  UrlFile,
} from '@deltadao/nautilus';
import { NetworkConfig } from './config';
import { metadata } from './metadata';
import { Wallet } from 'ethers';
import { getNum } from './utils';

export async function publishAccessDataset(
  nautilus: Nautilus,
  networkConfig: NetworkConfig,
  pricingConfig: any,
  wallet: Wallet
) {
  const owner = await wallet.getAddress();
  console.log(`Your address is ${owner}`);

  const serviceBuilder = new ServiceBuilder(ServiceTypes.ACCESS, FileTypes.URL); // access type dataset with URL data source

  const urlFile: UrlFile = {
    type: 'url', // there are multiple supported data source types, see https://docs.oceanprotocol.com/developers/storage
    url: 'https://raw.githubusercontent.com/deltaDAO/nautilus-examples/main/example_publish_assets/example-dataset.json', // link to your file or api
    method: 'GET', // HTTP request method
    // headers: {
    //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
    // }
  };

  const service = serviceBuilder
    .setServiceEndpoint(networkConfig.providerUri)
    .setTimeout(60)
    .addFile(urlFile)
    .setPricing(pricingConfig.FREE)
    .setDatatokenNameAndSymbol('My Datatoken Name', 'SYMBOL') // important for following access token transactions in the explorer
    .build();

  const assetBuilder = new AssetBuilder();
  const asset = assetBuilder
    .setType('dataset')
    .setName('Nautilus-Example: Access Dataset Name')
    .setDescription(
      '# Nautilus-Example Description \n\nThis asset has been published using the [nautilus-examples](https://github.com/deltaDAO/nautilus-examples) repository.'
    )
    .setAuthor('Company Name')
    .setLicense('MIT')
    .setContentLanguage('de')
    .addService(service)
    .setOwner(owner)
    .build();

  const result = await nautilus.publish(asset);
  console.log(result);
}

export async function publishComputeDataset(
  nautilus: Nautilus,
  networkConfig: NetworkConfig,
  pricingConfig: any,
  wallet: Wallet,
  metadata: metadata
) {
  const num = getNum(metadata.main.name)

  const owner = await wallet.getAddress();
  console.log(`Your address is ${owner}`);

  //ToolCondition-Algorithm
  const trustedAlgo1 = {
    did: 'did:op:bd74d6a281ba414de2b4d8ee4087277575f95676bd74e20ee9e2960c9c38d7c5', 
    filesChecksum:'e824e61f496db857b88c44a62670a8162e9cca2a21dcbdf0990f92f07fada0f4', //Hash of algorithm's files section
    containerSectionChecksum:'8f7e42a9529e57f6d4c198a23bb26461be7d36873b2d4ccaeedaf2e36f492541'
  }
  //CO2-Estimate Algorithm
  const trustedAlgo2 = {
    did: 'did:op:a3da777fd3711da36d5e1e5904a8c074b6e8df51549db2b6c8a5bc7ec3ab60cf', 
    filesChecksum:'e824e61f496db857b88c44a62670a8162e9cca2a21dcbdf0990f92f07fada0f4',
    containerSectionChecksum:'0bc95cdfec91541042d6847c82af4401261fcff633d41d9fba8e612760d77996'
  }

  const serviceBuilder = new ServiceBuilder(ServiceTypes.COMPUTE, FileTypes.URL); // compute type dataset with URL data source

  serviceBuilder
    .setServiceEndpoint(networkConfig.providerUri)
    .setTimeout(86400)
    .setPricing(pricingConfig.FIXED_EUROE)
    .setDatatokenNameAndSymbol(`Data Part No. ${num} EuProGigant`, `EuProGigant-${num}`) // important for following access token transactions in the explorer
    .addTrustedAlgorithm(trustedAlgo1)
    .addTrustedAlgorithm(trustedAlgo2)
    .allowRawAlgorithms(false)
    //.addConsumerParameter(cunsumerParameter) // optional

  metadata.main.files.forEach((file) => {
    const urlFile: UrlFile = {
      type: 'url',
      url: file.url, // link to your file or api
      method: file.method,
      index: file.index
      // headers: {
      //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
      // }
    };
    serviceBuilder.addFile(urlFile)
  });
  const service = serviceBuilder.build()

  const assetBuilder = new AssetBuilder();
  const asset = assetBuilder
    .setType(metadata.main.type)
    .setName(metadata.main.name)
    .setDescription(metadata.main.description)
    .setAuthor(metadata.main.author)
    .setLicense(metadata.main.license)
    .setContentLanguage('de')
    .addTags(metadata.main.tags)
    .addService(service)
    .setOwner(owner)
    .addAdditionalInformation(metadata.additionalInformation)
    .build();

  const result = await nautilus.publish(asset);
  console.log(result);
}

export async function publishComputeAlgorithm(
  nautilus: Nautilus,
  networkConfig: NetworkConfig,
  pricingConfig: any,
  wallet: Wallet
) {
  const owner = await wallet.getAddress();
  console.log(`Your address is ${owner}`);

  const serviceBuilder = new ServiceBuilder(ServiceTypes.COMPUTE, FileTypes.URL);

  const urlFile: UrlFile = {
    type: 'url',
    url: 'https://raw.githubusercontent.com/deltaDAO/nautilus-examples/main/example_publish_assets/count-lines-algorithm.js', // link to your algorithm logic, will be run using the defined conatainer
    method: 'GET',
  };

  const service = serviceBuilder
    .setServiceEndpoint(networkConfig.providerUri)
    .setTimeout(86400)
    .addFile(urlFile)
    .setPricing(pricingConfig.FIXED_OCEAN)
    .setDatatokenNameAndSymbol('My Datatoken Name', 'SYMBOL')
    .build();

  const algoMetadata = {
    language: 'Node.js',
    version: '1.0.0',
    container: {
      // https://hub.docker.com/layers/library/node/18.17.1/images/sha256-91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7?context=explore
      entrypoint: 'node $ALGO',
      image: 'node',
      tag: '18.17.1',
      checksum: 'sha256:91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7',
    },
  };

  const assetBuilder = new AssetBuilder();

  const asset = assetBuilder
    .setType('algorithm')
    .setName('Nautilus-Example: Compute Algorithm Name')
    .setDescription(
      `# Nautilus-Example Description \n\nThis asset has been published using the [nautilus-examples](https://github.com/deltaDAO/nautilus-examples) repository.`
    ) // supports markdown
    .setAuthor('Your Company Name')
    .setLicense('MIT')
    .setAlgorithm(algoMetadata)
    .addService(service)
    .setOwner(owner)
    .build();

  const result = await nautilus.publish(asset);
  console.log(result);
}
