import { Test, TestingModule } from '@nestjs/testing';
import { RestController } from './rest.controller';
import { AppService } from './app.service';

describe('RestController', () => {
  let restController: RestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
      providers: [AppService],
    }).compile();

    restController = app.get<RestController>(RestController);
  });

  describe('root', () => {
    it('should return "true', () => {
      expect(restController.getHealthz()).toBe(true);
    });
  });
});
