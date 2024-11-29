import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTutoriaInput {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  //exampleField: number;
  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  asignatura: string;

  @Field(()=> Int)
  @IsNumber()
  @IsNotEmpty()
  numero_horas: number;

  @Field(()=> Date)
  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @Field(()=> String)
  @IsString()
  @IsNotEmpty()
  hora: string;

  @Field(()=> ID)
  @IsString()
  @IsNotEmpty()
  tutorId: string;

  @Field(()=> ID)
  @IsString()
  @IsNotEmpty()
  tutoradoId: string;
}
