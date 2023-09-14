import { expect } from 'chai';
import { access } from '../../src/access';
import { Wallet, providers } from 'ethers';
import { Nautilus } from '@deltadao/nautilus';
import { NETWORK_CONFIGS, NetworkConfig, PricingConfig } from '../../src/config';

describe('publish', function () {
  describe('#publishAccessDataset()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {});
      it('2.input: throws error if not of type NetworkConfig', async function () {});
      it('3.input: throws error if not of type PricingConfig', async function () {});
      it('4.input: throws error if not of type wallet', async function () {});
    });
    describe('output tests', function () {
      it('returns a PublishResponse with nftAddress', function () {});
    });
  });
  describe('#publishComputeDataset()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {});
      it('2.input: throws error if not of type NetworkConfig', async function () {});
      it('3.input: throws error if not of type PricingConfig', async function () {});
      it('4.input: throws error if not of type wallet', async function () {});
    });
    describe('output tests', function () {
      it('returns a PublishResponse with nftAddress', function () {});
    });
  });
  describe('#publishComputeAlgorithm()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {});
      it('2.input: throws error if not of type NetworkConfig', async function () {});
      it('3.input: throws error if not of type PricingConfig', async function () {});
      it('4.input: throws error if not of type wallet', async function () {});
    });
    describe('output tests', function () {
      it('returns a PublishResponse with nftAddress', function () {});
    });
  });
});
