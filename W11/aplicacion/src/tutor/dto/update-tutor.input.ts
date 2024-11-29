import {  IsUUID } from 'class-validator';
import { CreateTutorInput } from './create-tutor.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTutorInput extends PartialType(CreateTutorInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
