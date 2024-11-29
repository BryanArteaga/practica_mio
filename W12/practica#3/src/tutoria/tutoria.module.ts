import { Module } from '@nestjs/common';
import { TutoriaService } from './tutoria.service';
import { TutoriaGateway } from './tutoria.gateway';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [TutoriaGateway, TutoriaService, PrismaService],
})
export class TutoriaModule {}
