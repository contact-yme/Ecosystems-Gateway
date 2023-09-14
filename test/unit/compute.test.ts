import { expect } from 'chai';
import { access } from '../../src/access';
import { Wallet, providers } from 'ethers';
import { Nautilus } from '@deltadao/nautilus';
import { NETWORK_CONFIGS, NetworkConfig, PricingConfig } from '../../src/config';

describe('compute', function () {
  describe('#compute()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {});
      it('2.input: throws error for non-string datasetDid', async function () {});
      it('3.input: throws error for non-string algoDid', async function () {});
    });
    describe('output tests', function () {
      it('returns a Compute JobId', function () {});
    });
  });
  describe('#getComputeStatus()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {});
      it('2.input: throws error for non-string providerUri', async function () {});
      it('3.input: throws error for non-string jobId', async function () {});
    });
    describe('output tests', function () {
      it('returns computeJobStatus', function () {});
    });
  });
  describe('#retrieveComputeResult()', function () {
    describe('input tests', function () {
      it('1.input: throws error if not an instance of Nautilus', async function () {});
      it('2.input: throws error for non-string providerUri', async function () {});
      it('3.input: throws error for non-string jobId', async function () {});
    });
    describe('output tests', function () {
      it('returns computeResult', function () {});
    });
  });
});
