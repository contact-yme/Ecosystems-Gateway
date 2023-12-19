import { Test, TestingModule } from '@nestjs/testing';
import { XfscService } from './xfsc.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('XfscService', () => {
  let service: XfscService;
  let httpService: HttpService;

  const mockHttpService = {
    axiosRef: {
      request: jest.fn(),
      post: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XfscService,
        HttpService,
        ConfigService, // replace me with TestConfig
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<XfscService>(XfscService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
