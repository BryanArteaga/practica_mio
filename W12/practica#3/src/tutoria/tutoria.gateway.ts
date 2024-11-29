import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { TutoriaService } from './tutoria.service';
import { Server, Socket } from 'socket.io';
import { CreateTutoriaInput  } from './dto/create-tutoria.input';
import { UpdateTutoriaInput } from './dto/update-tutoria.input'
import { mensajeDto } from './dto/mensaje.dto';

@WebSocketGateway({cors:true})
export class TutoriaGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  wss: Server;

  constructor(private readonly tutoriaService: TutoriaService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Cliente intentando conectar: ${client.id}`);
    const token = client.handshake.headers.authentication as string;
    console.log(`Token recibido: ${token}`);
  
    try {
      await this.tutoriaService.registerClient(client, token);
      console.log(`Cliente conectado: ${client.id}`);
    } catch (error) {
      console.error(`Error al conectar cliente: ${error.message}`);
      client.disconnect();
      return;
    }
    
    this.wss.emit('clients-updated', this.tutoriaService.getConnectedClients());
  }
  

  handleDisconnect(client: Socket) {
    this.tutoriaService.removeClient( client.id );
    this.wss.emit('clients-updated', this.tutoriaService.getConnectedClients() );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient( client: Socket, payload: mensajeDto ) {
    this.wss.emit('message-from-server', {
      fullName: this.tutoriaService.getUserFullName(client.id),
      message: payload.message || 'empty-message!!'
    });

  }

  @SubscribeMessage('create-tutoria')
  async onCreateTutoria(client: Socket, payload: CreateTutoriaInput) {
    const tutoria = await this.tutoriaService.create(payload);
    this.wss.emit('tutoria-created', tutoria);
    return tutoria;
  }

  @SubscribeMessage('update-tutoria') 
  async onUpdateTutoria(client: Socket, payload: UpdateTutoriaInput) {
    const tutoria = await this.tutoriaService.update(payload.id, payload);
    this.wss.emit('tutoria-updated', tutoria);
    return tutoria;
  }

  @SubscribeMessage('delete-tutoria')
  async onDeleteTutoria(client: Socket, id: string) {
    await this.tutoriaService.remove(id);
    this.wss.emit('tutoria-deleted', id);
    return id;
  }

  @SubscribeMessage('find-all-tutorias')
  async onFindAllTutorias() {
    const tutorias = await this.tutoriaService.findAll();
    return tutorias;
  }

  @SubscribeMessage('find-one-tutoria') 
  async onFindOneTutoria(client: Socket, id: string) {
    const tutoria = await this.tutoriaService.findOne(id);
    return tutoria;
  }
}

