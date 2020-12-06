import { Test, TestingModule } from '@nestjs/testing';
import { AdministartorService } from './administartor.service';

describe('AdministartorService', () => {
  let service: AdministartorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministartorService],
    }).compile();

    service = module.get<AdministartorService>(AdministartorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
