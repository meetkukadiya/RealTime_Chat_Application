import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // public socket: Socket;
  //   private socket!: Socket;

  //   private socket: Socket;

  constructor() {
    // this.socket = io('http://localhost:3001');
  }

  sendMessage(message: string) {
    // this.socket.emit("message", message);
  }

  //   getMessages() {
  //     return this.socket("message");
  //   }

  //   constructor() {
  //     this.socket = io('http://localhost:3001');

  //     console.log('Socket connected', this.socket);

  //     this.socket.on('connect', () => {
  //       console.log('Connected to server');
  //     });
  //   }

  //   sendMessage(message: string) {
  //     this.socket.emit('message', message);
  //   }

  //   receiveMessages(): Observable<string> {
  //     return new Observable<string>((observer) => {
  //       this.socket.on('message', (message: string) => {
  //         observer.next(message);
  //       });
  //     });
  //   }
}
