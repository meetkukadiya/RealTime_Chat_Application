import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../Sidebar/sidebar.component';
import { ChatService } from '../../../Services/chat.service';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, SidebarComponent, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages: {
    text: string;
    sender: string;
    receiver: string;
    timestamp: string;
  }[] = [];
  newMessage: string = '';
  userEmail: string | null;
  onlineUsers: { userEmail: string }[] = [];

  @Input() selectedUser: string | null = null;
  @Output() messageSent = new EventEmitter<string>();

  constructor(private chatService: ChatService) {
    this.userEmail = localStorage.getItem('userEmail');
  }

  // selectedChat: any = {
  //   messages: [
  //     { sender: 'opponent', text: 'Hi there!' },
  //     { sender: 'user', text: 'Hello' },
  //   ],
  // };

  // ngOnInit() {
  //   this.chatService.receiveMessages().subscribe((message: string) => {
  //     this.messages.push(message);
  //   });
  // }

  private socket: any;
  // socket = io('http://localhost:3001');

  ngOnInit() {
    this.socket = io('http://localhost:3001');

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socket.emit('userConnected', { userEmail: this.userEmail });

      this.socket.on('onlineUsers', (onlineUsers: { userEmail: string }[]) => {
        this.onlineUsers = onlineUsers;
        console.log('Online Users:', onlineUsers);
      });
    });
    console.log('Socket Details ==> ', this.socket);

    this.socket.on(
      'message',
      (data: {
        SenderID: string;
        ReceiverID: string;
        message: string;
        timestamp: string;
      }) => {
        console.log('Message received:', data);

        if (
          (data.SenderID === this.userEmail &&
            data.ReceiverID === this.selectedUser) ||
          (data.ReceiverID === this.userEmail &&
            data.SenderID === this.selectedUser)
        ) {
          this.messages.push({
            text: data.message,
            sender: data.SenderID,
            receiver: data.ReceiverID,
            timestamp: data.timestamp,
          });
        }

        // console.log('All Messages : ', data);
      }
    );
    // this.socket.on('newMessage', (data: any) => {
    //   console.log('New message received:', data.text);
    //   // console.log('Received At', data.createdAt);
    //   this.messages.push(`${data.text} (Received at: ${data.createdAt})`);
    // });

    // this.socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });
  }

  // sendMessage() {
  //   if (this.newMessage) {
  //     this.chatService.sendMessage(this.newMessage.trim());
  //     console.log('User Entered Message :', this.newMessage.trim());
  //     this.newMessage = '';
  //   }
  // }

  // sendMessage() {
  //   if (this.newMessage) {
  //
  //     this.socket.emit('message', this.newMessage.trim());

  //     console.log('User Entered Message :', this.newMessage.trim());
  //     this.newMessage = '';
  //   }
  // }

  sendMessage() {
    // console.log('Selected User : ', );
    if (this.newMessage) {
      const userEmail = localStorage.getItem('userEmail');

      if (!userEmail) {
        console.error('User ID not found.');
        return;
      }

      this.socket.emit('message', {
        SenderID: userEmail,
        message: this.newMessage.trim(),
        ReceiverID: this.selectedUser,
      });

      console.log(
        'User Entered Message:',
        this.newMessage.trim() +
          '    from ==> ' +
          userEmail +
          ' to ==>  ' +
          this.selectedUser
      );
      this.newMessage = '';
    }
  }

  isUserOnline(user: string | null): boolean {
    console.log(
      'User is Online',
      this.onlineUsers.some((onlineUser) => onlineUser.userEmail === user)
    );
    return this.onlineUsers.some((onlineUser) => onlineUser.userEmail === user);
  }

  // receiveMessages(): Observable<string> {
  //   return new Observable((observer) => {
  //     this.socket.on('message', (message: string) => {
  //       observer.next(message);
  //     });

  //     return () => {
  //       this.socket.off('message');
  //     };
  //   });
  // }
}
