import { Test, TestingModule } from '@nestjs/testing';
import { TutorResolver } from './tutor.resolver';
import { TutorService } from './tutor.service';

describe('TutorResolver', () => {
  let resolver: TutorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorResolver, TutorService],
    }).compile();

    resolver = module.get<TutorResolver>(TutorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
