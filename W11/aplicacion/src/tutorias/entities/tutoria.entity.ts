import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Tutorado } from 'src/tutorado/entities/tutorado.entity';

@ObjectType()
export class Tutoria {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  //exampleField: number;
  @Field(()=>ID)
  id:string;

  @Field(()=>String)
  asignatura:string;

  @Field(()=>Int)
  numero_horas:number;

  @Field(()=>Date)
  fecha: Date;

  @Field(()=>String)
  hora:string;

  @Field(() => Tutor) 
  tutor?: Tutor; 

  @Field(() => Tutorado) 
  tutorado?: Tutorado; 

}
