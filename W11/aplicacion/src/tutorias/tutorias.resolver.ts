import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TutoriasService } from './tutorias.service';
import { Tutoria } from './entities/tutoria.entity';
import { CreateTutoriaInput } from './dto/create-tutoria.input';
import { UpdateTutoriaInput } from './dto/update-tutoria.input';

@Resolver(() => Tutoria)
export class TutoriasResolver {
  constructor(private readonly tutoriasService: TutoriasService) {}

  @Mutation(() => Tutoria)
  createTutoria(@Args('createTutoriaInput') createTutoriaInput: CreateTutoriaInput)
  : Promise<Tutoria> {
    return this.tutoriasService.create(createTutoriaInput);
  }

  @Query(() => [Tutoria], { name: 'tutorias' })
  findAll(): Promise<Tutoria[]> {
    return this.tutoriasService.findAll();
  }

  @Query(() => Tutoria, { name: 'tutoria' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Tutoria> {
    return this.tutoriasService.findOne(id);
  }

  @Mutation(() => Tutoria)
  updateTutoria(@Args('updateTutoriaInput') updateTutoriaInput: UpdateTutoriaInput): Promise<Tutoria> {
    return this.tutoriasService.update(updateTutoriaInput.id, updateTutoriaInput);
  }

  @Mutation(() => Tutoria)
  removeTutoria(@Args('id', { type: () => ID }) id: string): Promise<Tutoria> {
    return this.tutoriasService.remove(id);
  }
}
