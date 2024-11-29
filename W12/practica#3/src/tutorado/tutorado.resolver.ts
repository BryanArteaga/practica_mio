import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TutoradoService } from './tutorado.service';
import { Tutorado } from './entities/tutorado.entity';
import { CreateTutoradoInput } from './dto/create-tutorado.input';
import { UpdateTutoradoInput } from './dto/update-tutorado.input';

@Resolver(() => Tutorado)
export class TutoradoResolver {
  constructor(private readonly tutoradoService: TutoradoService) {}

  @Mutation(() => Tutorado)
  createTutorado(@Args('createTutoradoInput') createTutoradoInput: CreateTutoradoInput): Promise<Tutorado> {
    return this.tutoradoService.create(createTutoradoInput);
  }

  @Query(() => [Tutorado], { name: 'tutorados' })
  findAll(): Promise<Tutorado[]> {
    return this.tutoradoService.findAll();
  }

  @Query(() => Tutorado, { name: 'tutorado' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Tutorado> { 
    return this.tutoradoService.findOne(id);
  }

  @Mutation(() => Tutorado)
  updateTutorado(@Args('updateTutoradoInput') updateTutoradoInput: UpdateTutoradoInput): Promise<Tutorado> {
    return this.tutoradoService.update(updateTutoradoInput.id, updateTutoradoInput);
  }

  @Mutation(() => Tutorado)
  removeTutorado(@Args('id', { type: () => ID }) id: string): Promise<Tutorado> { 
    return this.tutoradoService.remove(id);
  }
}