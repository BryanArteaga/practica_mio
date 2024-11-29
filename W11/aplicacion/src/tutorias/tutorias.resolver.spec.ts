import { Test, TestingModule } from '@nestjs/testing';
import { TutoriasResolver } from './tutorias.resolver';
import { TutoriasService } from './tutorias.service';

describe('TutoriasResolver', () => {
  let resolver: TutoriasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoriasResolver, TutoriasService],
    }).compile();

    resolver = module.get<TutoriasResolver>(TutoriasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
