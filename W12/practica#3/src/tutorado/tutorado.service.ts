import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutoradoInput } from './dto/create-tutorado.input';
import { UpdateTutoradoInput } from './dto/update-tutorado.input';
import { PrismaService } from 'prisma/prisma.service';
import { Tutorado } from '@prisma/client';

@Injectable()
export class TutoradoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTutoradoInput: CreateTutoradoInput): Promise<Tutorado> {
    return await this.prisma.tutorado.create({
      data: createTutoradoInput,
    });
  }

  async findAll(): Promise<Tutorado[]> {
    return this.prisma.tutorado.findMany();
  }

  async findOne(id: string): Promise<Tutorado> {
    const tutorado = await this.prisma.tutorado.findUnique({
      where: { id },
    });
    if (!tutorado) {
      throw new NotFoundException('Tutorado no Encontrado');
    }
    return tutorado;
  }

  async update(id: string, updateTutoradoInput: UpdateTutoradoInput): Promise<Tutorado> {
    const updated = await this.prisma.tutorado.update({
      where: { id },
      data: updateTutoradoInput,
    });
    return updated;
  }

  async remove(id: string): Promise<Tutorado> {
    const removed = await this.prisma.tutorado.delete({
      where: { id },
    });
    return removed;
  }
}