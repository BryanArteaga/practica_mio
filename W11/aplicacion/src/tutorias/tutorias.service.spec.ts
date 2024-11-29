import { Test, TestingModule } from '@nestjs/testing';
import { TutoriasService } from './tutorias.service';

describe('TutoriasService', () => {
  let service: TutoriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoriasService],
    }).compile();

    service = module.get<TutoriasService>(TutoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
