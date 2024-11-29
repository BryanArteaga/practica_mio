import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Tutoria } from 'src/tutorias/entities/tutoria.entity';
import { OneToMany } from 'typeorm';

@ObjectType()
export class Tutorado {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  //exampleField: number;

  @Field(()=>ID)
  id: string;

  @Field(()=>String)
  name: string;
  
  @Field(()=>String)
  identificacion: string;

  @Field(() => [Tutoria], { nullable: true })
  tutorias?: Tutoria[]; 

}
