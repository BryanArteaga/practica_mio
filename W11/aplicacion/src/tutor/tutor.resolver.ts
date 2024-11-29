import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TutorService } from './tutor.service';
import { Tutor } from './entities/tutor.entity';
import { CreateTutorInput } from './dto/create-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';

@Resolver(() => Tutor)
export class TutorResolver {
  constructor(private readonly tutorService: TutorService) {}

  @Mutation(() => Tutor)
  createTutor(@Args('createTutorInput') createTutorInput: CreateTutorInput): Promise<Tutor> {
    return this.tutorService.create(createTutorInput);
  }

  @Query(() => [Tutor], { name: 'tutores' })
  findAll(): Promise<Tutor[]> {
    return this.tutorService.findAll();
  }

  @Query(() => Tutor, { name: 'tutor' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Tutor> { 
    return this.tutorService.findOne(id);
  }

  @Mutation(() => Tutor)
  updateTutor(@Args('updateTutorInput') updateTutorInput: UpdateTutorInput): Promise<Tutor> {
    return this.tutorService.update(updateTutorInput.id, updateTutorInput);
  }

  @Mutation(() => Tutor)
  removeTutor(@Args('id', { type: () => ID }) id: string): Promise<Tutor> { 
    return this.tutorService.remove(id);
  }
}