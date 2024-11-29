import { Module } from '@nestjs/common';
import { TutoriaModule } from './tutoria/tutoria.module';
import { TutorModule } from './tutor/tutor.module';
import { TutoradoModule } from './tutorado/tutorado.module';

@Module({
  imports: [TutorModule, TutoradoModule, TutoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
