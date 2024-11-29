import { IsUUID } from 'class-validator';
import { CreateTutoradoInput } from './create-tutorado.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTutoradoInput extends PartialType(CreateTutoradoInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
