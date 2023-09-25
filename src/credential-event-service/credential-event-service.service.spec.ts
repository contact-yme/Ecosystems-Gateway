import { Test, TestingModule } from '@nestjs/testing';
import { CredentialEventServiceService } from './credential-event-service.service';

describe('CredentialEventServiceService', () => {
  let service: CredentialEventServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialEventServiceService],
    }).compile();

    service = module.get<CredentialEventServiceService>(
      CredentialEventServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
