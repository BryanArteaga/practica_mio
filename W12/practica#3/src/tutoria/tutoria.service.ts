import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTutoriaInput } from './dto/create-tutoria.input';
import { UpdateTutoriaInput } from './dto/update-tutoria.input';
import { Socket } from 'socket.io';

interface User {
    id: string;
    name: string;
    isActive: boolean;
}

interface ConnectedClients {
    [id: string]: {
        socket: Socket;
        user: User;
    };
}

const users: User[] = [
    { id: '1', name: 'Bryan', isActive: true },
    { id: '2', name: 'Rafael', isActive: true },
    { id: '3', name: 'Michael', isActive: false },
];

@Injectable()
export class TutoriaService {
  private connectedClients: ConnectedClients = {};

  constructor(private prisma: PrismaService) {}

  async registerClient( client: Socket, userId: string ) {

    const user = users.find( user => user.id === userId)
    if ( !user ) throw new Error('User not found');
    if ( !user.isActive ) throw new Error('User not active');

    this.checkUserConnection( user );

    this.connectedClients[client.id] = {
        socket: client,
        user: user,
    };
}

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys( this.connectedClients );
    }  
  getUserFullName( socketId: string ) {
    return this.connectedClients[socketId].user.name;
}

  async create(CreateTutoriaInput: CreateTutoriaInput) {
    return await this.prisma.tutoria.create({
      data: {
        tutor: { connect: { id: CreateTutoriaInput.tutorId } },
        tutorado: { connect: { id: CreateTutoriaInput.tutoradoId } },
        asignatura: CreateTutoriaInput.asignatura,
        numero_horas: CreateTutoriaInput.numero_horas,
        fecha: CreateTutoriaInput.fecha,
        hora: CreateTutoriaInput.hora,
      },
      include: {
        tutor: true,
        tutorado: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.tutoria.findMany({
      include: {
        tutor: true,
        tutorado: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.tutoria.findUnique({
      where: { id },
      include: {
        tutor: true,
        tutorado: true,
      },
    });
  }

  async update(id: string, UpdateTutoriaInput: UpdateTutoriaInput) {
    return await this.prisma.tutoria.update({
      where: { id:id },
      data: {
        tutor: UpdateTutoriaInput.tutorId ? { connect: { id: UpdateTutoriaInput.tutorId } } : undefined,
        tutorado: UpdateTutoriaInput.tutoradoId ? { connect: { id: UpdateTutoriaInput.tutoradoId } } : undefined,
        asignatura: UpdateTutoriaInput.asignatura,
        numero_horas: UpdateTutoriaInput.numero_horas,
        fecha: UpdateTutoriaInput.fecha,
        hora: UpdateTutoriaInput.hora,
      },
      include: {
        tutor: true,
        tutorado: true,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.tutoria.delete({
      where: { id },
    });
    return id;
  }

  private checkUserConnection( user: User ) {

    for (const clientId of Object.keys( this.connectedClients ) ) {
        
        const connectedClient = this.connectedClients[clientId];

        if ( connectedClient.user.id === user.id ){
            connectedClient.socket.disconnect();
            break;
        }
    }

    }
}
