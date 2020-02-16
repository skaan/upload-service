import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import pjson from '../package.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return service version', () => {
      expect(appController.getVersion()).toBe(pjson.version);
    });
  });
});
