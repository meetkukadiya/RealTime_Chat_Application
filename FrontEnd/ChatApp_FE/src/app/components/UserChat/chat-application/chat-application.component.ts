import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../Sidebar/sidebar.component';
import { ChatComponent } from '../Chat/chat.component';

@Component({
  selector: 'app-chat-application',
  standalone: true,
  imports: [SidebarComponent, ChatComponent],
  templateUrl: './chat-application.component.html',
  styleUrl: './chat-application.component.css',
})
export class ChatApplicationComponent {
  selectedUserEmail: string | null = null;
  activeUser: string | null = null;

  onUserSelected(email: string) {
    this.activeUser = email;
    this.selectedUserEmail = email;
    console.log('Parent Component ==> ', email);
  }
}
