import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutoriaInput } from './dto/create-tutoria.input';
import { UpdateTutoriaInput } from './dto/update-tutoria.input';
import { PrismaService } from 'prisma/prisma.service';
import { Tutoria } from '@prisma/client';

@Injectable()
export class TutoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTutoriaInput: CreateTutoriaInput): Promise<Tutoria> {
    return await this.prisma.tutoria.create({
      data: createTutoriaInput,
    });
  }

  async findAll(): Promise<Tutoria[]> {
    return this.prisma.tutoria.findMany();
  }

  async findOne(id: string): Promise<Tutoria> {
    const tutoria = await this.prisma.tutoria.findUnique({
      where: { id },
    });
    if (!tutoria) {
      throw new NotFoundException('Tutoria no Encontrada');
    }
    return tutoria;
  }

  async update(id: string, updateTutoriaInput: UpdateTutoriaInput): Promise<Tutoria> {
    const updated = await this.prisma.tutoria.update({
      where: { id },
      data: updateTutoriaInput,
    });
    return updated;
  }

  async remove(id: string): Promise<Tutoria> {
    const removed = await this.prisma.tutoria.delete({
      where: { id },
    });
    return removed;
  }
}