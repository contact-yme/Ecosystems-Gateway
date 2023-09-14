import { expect } from 'chai';
import { createWallet } from '../../src/utils';
import { Wallet, providers } from 'ethers';

describe('utils', function () {
  describe('#createWallet()', function () {
    describe('input tests', function () {
      it('1.input: throws error for non-string private key', function () {
        const privateKey = 0;
        const nodeUri = 'https://rpc.genx.minimal-gaia-x.eu';
        try {
          //@ts-ignore
          createWallet(privateKey, nodeUri);
        } catch (e) {
          expect(e instanceof TypeError).to.be.true;
        }
      });
      it('2.input: throws error for non-string nodeUri', function () {
        const privateKey = '0x..';
        const nodeUri = 0;
        try {
          //@ts-ignore
          createWallet(privateKey, nodeUri);
        } catch (e) {
          expect(e instanceof TypeError).to.be.true;
        }
      });
    });
    describe('output tests', function () {
      it('returns a Wallet instance with correct address and provider', function () {
        const privateKey = '0x282af4f97caeb5d3be15369b62ac1223a599c80f4b7a581321666d91da0a531f';
        const nodeUri = 'https://rpc.genx.minimal-gaia-x.eu';
        const result = createWallet(privateKey, nodeUri);
        expect(result, 'Output is not an instance of Wallet').is.instanceOf(Wallet);
        expect(result.address, 'Incorrect address to private key').to.equal(
          '0xC168a115F1Bf13Eac6b03Df21aFc62a5b973BE7b'
        );
        expect(providers.Provider.isProvider(result.provider), 'Provider is not connected').to.be.true;
      });
    });
  });
});
