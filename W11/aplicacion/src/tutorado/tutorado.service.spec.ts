import { Test, TestingModule } from '@nestjs/testing';
import { TutoradoService } from './tutorado.service';

describe('TutoradoService', () => {
  let service: TutoradoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoradoService],
    }).compile();

    service = module.get<TutoradoService>(TutoradoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
