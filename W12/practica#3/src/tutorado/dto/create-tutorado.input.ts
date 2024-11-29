import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTutoradoInput {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  //exampleField: number;

  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  name: string;
}
