import * as dotenv from "dotenv";
//import * as assets from './assets.json' assert { type: "json" }
//import * as genx_config from './network_config.json' assert { type: "json" }
import {
  LogLevel,
  Nautilus,
  AssetBuilder,
  FileTypes,
  ServiceTypes,
  ServiceBuilder,
  UrlFile,
  PricingConfigWithoutOwner,
} from "@deltadao/nautilus";
import Web3 from "web3";

dotenv.config();

const config = {
  network: "genx",
  chainId: 100,
  metadataCacheUri: "https://aquarius510.v4.delta-dao.com",
  nodeUri: "https://rpc.genx.minimal-gaia-x.eu",
  providerUri: "https://provider.v4.genx.delta-dao.com",
  subgraphUri: "https://subgraph.v4.genx.minimal-gaia-x.eu",
  oceanTokenAddress: "0x0995527d3473b3a98c471f1ed8787acd77fbf009",
  oceanTokenDecimals: 18,
  oceanTokenSymbol: "OCEAN",
  fixedRateExchangeAddress: "0xAD8E7d2aFf5F5ae7c2645a52110851914eE6664b",
  dispenserAddress: "0x94cb8FC8719Ed09bE3D9c696d2037EA95ef68d3e",
  nftFactoryAddress: "0x6cb85858183b82154921f68b434299ec4281da53",
  providerAddress: "0x68C24FA5b2319C81b34f248d1f928601D2E5246B",
  euroeAddress: "0xe974c4894996e012399dedbda0be7314a73bbff1",
  euroeDecimals: 6,
};
console.log(config);

const assets = [
  {
    type: "dataset",
    name: "EuProGigant Test dataset",
    description: "test-publish",
    author: "EuProGigant",
    license: "CC-BY-4.0",
    dataUrl: "https://bitcoin.org/bitcoin.pdf",
  },
];

const web3 = new Web3(config.nodeUri);
const privateKey = process.env.EUPROGIGANT_KEY as string;
if (!privateKey) throw new Error("Private Key is undefined");

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.defaultAccount = account.address;

async function main() {
  Nautilus.setLogLevel(LogLevel.Verbose);
  const nautilus = await Nautilus.create(web3, config);

  await publishComputeDataset(nautilus);
  //await compute(nautilus)
  //await retrieveResult(nautilus)
}

async function publishComputeDataset(nautilus: Nautilus) {
  const assetBuilder = new AssetBuilder();
  assetBuilder
    .setType("dataset") // 'dataset' or 'algorithm'
    .setName(assets[0].name)
    .setDescription(assets[0].description) // supports markdown
    .setAuthor(assets[0].author)
    .setLicense(assets[0].license); // SPDX license identifier

  const serviceBuilder = new ServiceBuilder(ServiceTypes.ACCESS, FileTypes.URL);
  const urlFile: UrlFile = {
    type: "url",
    url: assets[0].dataUrl,
    method: "GET",
  };
  const service = serviceBuilder
    .setServiceEndpoint(config.providerUri)
    .setTimeout(0)
    .addFile(urlFile)
    .build();

  assetBuilder.addService(service);

  const pricingConfig: PricingConfigWithoutOwner = {
    type: "fixed",
    freCreationParams: {
      fixedRateAddress: config.fixedRateExchangeAddress,
      baseTokenAddress: config.euroeAddress,
      baseTokenDecimals: config.euroeDecimals,
      datatokenDecimals: 18,
      fixedRate: "1",
      marketFee: "0",
      marketFeeCollector: "0x0000000000000000000000000000000000000000",
    },
  };
  //const pricingConfig: PricingConfigWithoutOwner = {type: 'free'}

  assetBuilder.setPricing(pricingConfig);

  const owner = web3.defaultAccount!;
  assetBuilder.setOwner(owner);

  const token_name = `EuProGigant-Test Token`;
  const token_symbol = `EuProGigant-Test`;
  assetBuilder.setDatatokenNameAndSymbol(token_name, token_symbol);

  const asset = assetBuilder.build();

  const result = await nautilus.publish(asset);
  console.log(result);
}

async function compute(nautilus: Nautilus) {
  const dataset = {
    did: "did:op:909u09908",
  };
  const algorithm = {
    did: "did:op:kljlkkljl",
  };
  const computeConfig = {
    dataset,
    algorithm,
  };

  const computeJob = await nautilus.compute(computeConfig);
  console.log("COMPUTE JOB: ", computeJob);
  console.log("JobId: ", computeJob[0].jobId);
  getComputeStatus(nautilus, computeJob[0].jobId);
}

async function getComputeStatus(nautilus: Nautilus, jobId: string) {
  const computeStatus = await nautilus.getComputeStatus({
    jobId,
    providerUri: config.providerUri,
  });
  console.log("COMPUTE STATUS", computeStatus.statusText);
}

async function retrieveResult(nautilus: Nautilus, jobId: string) {
  const computeJob = await nautilus.getComputeResult({
    jobId,
    providerUri: config.providerUri,
  });
  console.log("RESULT URL", computeJob);
}

main();
