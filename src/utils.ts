import * as dotenv from 'dotenv';
import { Wallet, providers } from 'ethers';

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
