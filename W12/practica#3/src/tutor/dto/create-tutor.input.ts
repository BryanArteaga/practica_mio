import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTutorInput {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  //exampleField: number;

  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  experticia: string;
}
