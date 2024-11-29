import { Module } from '@nestjs/common';
import { TutoradoService } from './tutorado.service';
import { TutoradoResolver } from './tutorado.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [TutoradoResolver, TutoradoService, PrismaService],
})
export class TutoradoModule {}
