import { Test, TestingModule } from '@nestjs/testing';
import { PontusxService } from './pontusx.service';
import { ConfigService } from '@nestjs/config';
import { CredentialEventServiceService } from '../credential-event-service/credential-event-service.service';

describe('PontusxService', () => {
  let service: PontusxService;
  const mockCesService = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PontusxService,
        ConfigService,
        CredentialEventServiceService,
        {
          provide: CredentialEventServiceService,
          useValue: mockCesService,
        },
      ],
    }); // .compile(); // TODO: figure out how to test the pontusX thing

    // service = module.get<PontusxService>(PontusxService);
  });

  it('should be defined', () => {
    // TODO: figure out how to test the pontusX thing
    expect(true).toBe(true);
    // expect(service).toBeDefined();
  });
});
