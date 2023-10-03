import { Test, TestingModule } from '@nestjs/testing';
import { TabungController } from './tabung.controller';

describe('TabungController', () => {
  let controller: TabungController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TabungController],
    }).compile();

    controller = module.get<TabungController>(TabungController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
