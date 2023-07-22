import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClient {
    [id: string]: {
        socket: Socket,
        user: User,
    }
}

@Injectable()
export class MessagesWsService {

    private connectedClient: ConnectedClient = {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async registerClient(client: Socket, userId: string) {
        const user = await this.userRepository.findOneBy({ id: userId});
        if (!user) throw new Error('User not found');
        if (!user.isActive) throw new Error('User not active');

        this.checkUserConnection( user ) ;

        this.connectedClient[client.id] = {
            socket: client,
            user: user
        };

    }

    removeClient(clientId: string) {
        delete this.connectedClient[clientId];
    }

    getConnectedClient(): string[] {
        return Object.keys(this.connectedClient);

    }

    getUserFullName( socketId : string) {
        return this.connectedClient[socketId].user.fullName;
    }

    //! Solo conectar 1 vez al mismo usuario
    private checkUserConnection( user: User) {
        
        for (const clientId of Object.keys(this.connectedClient)) {
            const connectedClient = this.connectedClient[clientId];

            if ( connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }

}
