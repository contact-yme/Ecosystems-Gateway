import { Test, TestingModule } from '@nestjs/testing';
import { GrpcController } from './grpc.controller';
import { PontusxService } from './pontusx/pontusx.service';
import { CreateOfferingRequest } from './generated/src/_proto/spp_v2';
import { XfscService } from './xfsc/xfsc.service';

describe('Grpc Controller', () => {
  let controller: GrpcController;
 
  const mockPontusXService = {
    publishComputeAsset: jest.fn(() => ({
      ddo: { id: 'test-id' },
    })),
    updateOffering: jest.fn(),
    updateOfferingLifecycle: jest.fn(),
  }

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

    controller = module.get<GrpcController>(GrpcController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  it('Create offering', async () => {
    const OfferingRequest = {
      "offerings": [
          {
          "xfscOffering":
              {
                  "mockVP": "mokcVP"
              }
          }
        ]
    } as unknown as CreateOfferingRequest

    // PONTUS-X
    
    // XFSC
    const result = await controller.createOffering(OfferingRequest)
    expect(result).toBe('test-id')
    expect(mockXFSCService.publish).lastCalledWith(OfferingRequest)
  })
})
