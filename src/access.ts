import { Nautilus } from '@deltadao/nautilus';

export async function access(nautilus: Nautilus, assetDid: string) {
  if (!(nautilus instanceof Nautilus)) {
    throw new TypeError('The first input has to be an instance of Nautilus class');
  }
  if (typeof assetDid != 'string') {
    throw new TypeError('The assetDid has to be a string');
  }

  const accessUrl = await nautilus.access({ assetDid: assetDid });

  console.log('Download URL: ', accessUrl);
}
