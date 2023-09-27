import * as dotenv from 'dotenv';
import { Wallet, providers } from 'ethers';
import { metadata } from './metadata';
import testMetadata from '../test_metadata.json'

dotenv.config();

export function createWallet(privateKey: string, nodeUri: string) {
  if (typeof privateKey != 'string') {
    throw new TypeError('The private key has to be a string');
  }
  if (typeof nodeUri != 'string') {
    throw new TypeError('The nodeUri (Ocean Network URL) has to be a string');
  }

  const provider = new providers.JsonRpcProvider(nodeUri);

  const wallet = new Wallet(privateKey, provider);

  return wallet;
}

export function getNum(name: string) {
  //input: 'Data Part No. {num} EuProGigant'
  //return name.split(" ")[3]
  let num: string = ""
  const regex = /[0-9]+/;
  let m
  if ((m = regex.exec(name)) !== null) {  
    // The result can be accessed through the `m`-variable.
    num = m[0]
  };
  if (num === "") {
    num = "<<<Test>>>"
  }
  return num
}

export function getTestMetadata(): metadata {
  return testMetadata as metadata
}
