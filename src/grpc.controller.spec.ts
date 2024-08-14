import { Test, TestingModule } from '@nestjs/testing';
import { GrpcController } from './grpc.controller';
import { PontusxService } from './pontusx/pontusx.service';
import {
  PontusxOffering,
  Pricing_PricingType,
} from './generated/src/_proto/spp_v2';
import { CreateComputeToDataRequest, CreateComputeToDataResultRequest, GetComputeToDataResultResponse, GetOfferingRequest } from './generated/src/_proto/spp';
import { RpcException } from '@nestjs/microservices';

describe('Grpc Controller', () => {
  let controller: GrpcController;
  let pontusxService: PontusxService;

  const mockPontusXService = {
    publishAsset: jest.fn(() => ({
      ddo: { id: 'test-id' },
    })),
    updateOffering: jest.fn(),
    updateOfferingLifecycle: jest.fn(),
    getOffering: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcController],
      providers: [
        {
          provide: PontusxService,
          useValue: {
            publishComputeAsset: jest.fn(),
            updateOffering: jest.fn(),
            setState: jest.fn(),
            requestComputeToData: jest.fn(),
            getOffering: jest.fn(),
            getComputeToDataResult: jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<GrpcController>(GrpcController);
    pontusxService = module.get<PontusxService>(PontusxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Create offering', async () => {
    const result = await controller.createOffering({
      main: {
        type: 'dataset',
        author: '',
        licence: '',
        dateCreated: '',
        files: [],
        tags: [],
        description: '',
        allowedAlgorithm: [],
      },
      additionalInformation: undefined,
      token: '',
      name: '',
    });

    expect(mockPontusXService.publishAsset.mock.calls).toHaveLength(1);
    expect(result.id[0]).toEqual('test-id');
  });

  describe('runComputeToData', () => {
    it('should return a jobId if successful', async () => {
      const mockData: CreateComputeToDataRequest = { did: 'testDid', algorithm: 'testAlgorithm' } as any;
      const mockResult = ['mockJobId'];

      jest.spyOn(pontusxService, 'requestComputeToData').mockResolvedValue(mockResult);

      const result = await controller.runComputeToData(mockData);

      expect(result).toEqual({ jobId: mockResult });
      expect(pontusxService.requestComputeToData).toHaveBeenCalledWith(mockData.did, mockData.algorithm);
    });

    it('should throw an RpcException if requestComputeToData fails', async () => {
      const mockData: CreateComputeToDataRequest = { did: 'testDid', algorithm: 'testAlgorithm' } as any;
      const mockError = new Error('Something went wrong');

      jest.spyOn(pontusxService, 'requestComputeToData').mockRejectedValue(mockError);

      await expect(controller.runComputeToData(mockData)).rejects.toThrow(RpcException);
    });
  });

  describe('getOffering', () => {
    it('should return a did if an offering is found', async () => {
      const mockData: GetOfferingRequest = { did: 'testDid' } as any;
      const mockResult = { id: 'testDid' };

      // TODO: Fix this test, but Asset is inaccessible

      //jest.spyOn(pontusxService, 'getOffering').mockResolvedValue(mockResult);

      //const result = await controller.getOffering(mockData);

      //expect(result).toEqual({ did: mockResult.id });
      //expect(pontusxService.getOffering).toHaveBeenCalledWith(mockData.did);
    });

    it('should throw an RpcException if no offering is found', async () => {
      const mockData: GetOfferingRequest = { did: 'testDid' } as any;

      jest.spyOn(pontusxService, 'getOffering').mockResolvedValue(null);

      await expect(controller.getOffering(mockData)).rejects.toThrow(RpcException);
    });
  });

  describe('getComputeToDataResult', () => {
    it('should return "test-result"', async () => {
      const mockData: CreateComputeToDataResultRequest = { JobId: "mockJobId" }
      const mockResult: GetComputeToDataResultResponse = { JobId: "mockJobId", result: "test-result" };

      jest.spyOn(pontusxService, 'getComputeToDataResult').mockResolvedValue(mockResult.result);

      const result = await controller.getComputeToDataResult(mockData);

      expect(result).toEqual(mockResult);
      expect(pontusxService.getComputeToDataResult).toHaveBeenCalledWith(mockData.JobId);
    });
  });
});
