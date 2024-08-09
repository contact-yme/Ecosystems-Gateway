import { Test, TestingModule } from '@nestjs/testing';
import { GrpcController } from './grpc.controller';
import { PontusxService } from './pontusx/pontusx.service';

describe('Grpc Controller', () => {
  let controller: GrpcController;
 
  const mockPontusXService = {
    publishComputeAsset: jest.fn(() => ({
      ddo: { id: 'test-id' },
    })),
    updateOffering: jest.fn(),
    updateOfferingLifecycle: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcController],
      providers: [
        {
          provide: PontusxService,
          useValue: mockPontusXService,
        },
      ],
    }).compile();

    controller = module.get<GrpcController>(GrpcController);
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
    })

    expect(mockPontusXService.publishComputeAsset.mock.calls).toHaveLength(1);
    expect(result.did).toEqual('test-id');
  });
});
