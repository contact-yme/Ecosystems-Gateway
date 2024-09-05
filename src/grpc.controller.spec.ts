import { Test, TestingModule } from '@nestjs/testing';
import { GrpcController } from './grpc.controller';
import { PontusxService } from './pontusx/pontusx.service';
import { CreateComputeToDataRequest, CreateComputeToDataResultRequest, GetComputeToDataResultResponse, GetOfferingRequest, Pricing_PricingType, PontusxOffering, ComputeToDataResultType } from './generated/src/_proto/spp_v2';
import { RpcException } from '@nestjs/microservices';
import { XfscService } from './xfsc/xfsc.service';

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

  const mockXFSCService = {
    publish: jest.fn()
    .mockResolvedValue('test-id'),
    update: jest.fn()
    .mockResolvedValue('test-id'),
    delete: jest.fn(),
    revoke: jest.fn()
    .mockResolvedValue('test-id')  
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcController],
      providers: [
        {
          provide: PontusxService,
          useValue: mockPontusXService,
        },
        {
          provide: XfscService,
          useValue: mockXFSCService
        }
      ],
    }).compile()

    controller = module.get<GrpcController>(GrpcController);
    pontusxService = module.get<PontusxService>(PontusxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  it('Create offering', async () => {
    const result = await controller.createOffering({
      offerings: [
        {
          pontusxOffering: {
            metadata: {
              type: 'dataset',
              name: '',
              author: '',
              licence: '',
              tags: [],
              description: '',
            },
            services: [
              {
                type: 'access',
                files: [
                  {
                    url: '',
                    method: '',
                  },
                ],
                pricing: {
                  pricingType: Pricing_PricingType.FREE,
                },
                consumerParameters: [],
              },
            ],
            additionalInformation: undefined,
          },
        },
      ],
    });

    expect(mockPontusXService.publishAsset.mock.calls).toHaveLength(1);
    expect(result.id[0]).toEqual('test-id');
  });

  describe('runComputeToData', () => {
    it('should return a jobId if successful', async () => {
      const mockData: CreateComputeToDataResultRequest = {
        jobId: '',
        computeToDataReturnType: ComputeToDataResultType.C2D_DATA
      };
      const mockResult = ['mockJobId'];

      jest.spyOn(pontusxService, 'requestComputeToData').mockResolvedValue(mockResult);

      const result = await controller.getComputeToDataResult(mockData);

      expect(result).toEqual({ jobId: mockResult });
      expect(pontusxService.requestComputeToData).toHaveBeenCalledWith(mockData.jobId, mockData.computeToDataReturnType);
    });

    it('should throw an RpcException if requestComputeToData fails', async () => {
      const mockData: CreateComputeToDataResultRequest = {
        jobId: '',
        computeToDataReturnType: ComputeToDataResultType.C2D_DATA
      };
      const mockError = new Error('Something went wrong');

      jest.spyOn(pontusxService, 'requestComputeToData').mockRejectedValue(mockError);

      await expect(controller.getComputeToDataResult(mockData)).rejects.toThrow(RpcException);
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
      const mockData: CreateComputeToDataResultRequest = { jobId: "mockJobId", computeToDataReturnType: ComputeToDataResultType.C2D_DATA }
      const mockResult: GetComputeToDataResultResponse = { data: "mockJobId" };

      jest.spyOn(pontusxService, 'getComputeToDataResult').mockResolvedValue(mockResult.data);

      const result = await controller.getComputeToDataResult(mockData);

      expect(result).toEqual(mockResult);
      expect(pontusxService.getComputeToDataResult).toHaveBeenCalledWith(mockData.jobId);
    });
  });
});
