import { Test, TestingModule } from '@nestjs/testing';
import { TabungService } from './tabung.service';

describe('TabungService', () => {
  let service: TabungService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TabungService],
    }).compile();

    service = module.get<TabungService>(TabungService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
