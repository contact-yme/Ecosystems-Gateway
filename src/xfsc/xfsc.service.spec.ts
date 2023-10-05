import { Test, TestingModule } from '@nestjs/testing';
import { XfscService } from './xfsc.service';

describe('XfscService', () => {
  let service: XfscService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XfscService],
    }).compile();

    service = module.get<XfscService>(XfscService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
