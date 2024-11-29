import { IsUUID } from 'class-validator';
import { CreateTutoriaInput } from './create-tutoria.input';
import { InputType, Field, ID , PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTutoriaInput extends PartialType(CreateTutoriaInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
