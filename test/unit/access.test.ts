import { expect } from 'chai';
import { access } from '../../src/access';
import { Wallet, providers } from 'ethers';
import { Nautilus } from '@deltadao/nautilus';
import { NETWORK_CONFIGS } from '../../src/config';

describe('access', function () {
  describe('#access()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {
        const nautilus = 'Nautilus';
        const assetDid = 'did:op:69062f31842a0f6042c4b48b4173d8053e2e71a5f7d9be08483e475d9aa5f432';
        try {
          //@ts-ignore
          await access(nautilus, assetDid);
        } catch (e) {
          expect(e instanceof TypeError).to.be.true;
        }
      });
      it('2.input: throws error for non-string assetDid', async function () {
        const privateKey = '0x282af4f97caeb5d3be15369b62ac1223a599c80f4b7a581321666d91da0a531f';
        const nodeUri = 'https://rpc.genx.minimal-gaia-x.eu';
        const wallet = new Wallet(privateKey, new providers.JsonRpcProvider(nodeUri));
        const nautilus = await Nautilus.create(wallet, NETWORK_CONFIGS['PONTUSX']);
        const assetDid = 42;
        try {
          //@ts-ignore
          await access(nautilus, assetDid);
        } catch (e) {
          expect(e instanceof TypeError).to.be.true;
        }
      });
    });
    describe('output tests', function () {
      it('returns access URL', function () {});
    });
  });
});
