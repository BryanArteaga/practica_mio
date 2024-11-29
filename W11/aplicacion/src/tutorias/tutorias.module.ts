import { Module } from '@nestjs/common';
import { TutoriasService } from './tutorias.service';
import { TutoriasResolver } from './tutorias.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [TutoriasResolver, TutoriasService, PrismaService],
})
export class TutoriasModule {}
