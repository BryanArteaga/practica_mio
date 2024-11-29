import { Test, TestingModule } from '@nestjs/testing';
import { TutoradoResolver } from './tutorado.resolver';
import { TutoradoService } from './tutorado.service';

describe('TutoradoResolver', () => {
  let resolver: TutoradoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoradoResolver, TutoradoService],
    }).compile();

    resolver = module.get<TutoradoResolver>(TutoradoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
