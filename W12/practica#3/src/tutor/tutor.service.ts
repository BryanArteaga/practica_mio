import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorInput } from './dto/create-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';
import { Tutor } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TutorService {
  
  constructor(
    private readonly prisma: PrismaService  
  ){}
  
  async create(createTutorInput: CreateTutorInput): Promise<Tutor> {
    return await this.prisma.tutor.create({
      data: createTutorInput, 
    });
  }

  async findAll(): Promise<Tutor[]> {
    return this.prisma.tutor.findMany();
  }

  async findOne(id: string): Promise<Tutor> {
    const tutor = await this.prisma.tutor.findUnique({
      where: { id },
    });
    if (!tutor) {
      throw new NotFoundException('Tutor no Encontrado');
    }
    return tutor;
  }

  async update(id: string, updateTutorInput: UpdateTutorInput): Promise<Tutor> {
    const updated = await this.prisma.tutor.update({
      where: { id },
      data: updateTutorInput,
    });
    if (!updated) {
      throw new NotFoundException('Tutor no encontrado');
    }
    return updated;
  }

  async remove(id: string): Promise<Tutor> {
    const removed = await this.prisma.tutor.delete({
      where: { id },
    });
    if (!removed) {
      throw new NotFoundException('Tutor no encontrado');
    }
    return removed;
  }
}
