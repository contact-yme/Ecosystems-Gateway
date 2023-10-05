import { Test, TestingModule } from '@nestjs/testing';
import { PontusxService } from './pontusx.service';

describe('PontusxService', () => {
  let service: PontusxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PontusxService],
    }).compile();

    service = module.get<PontusxService>(PontusxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
