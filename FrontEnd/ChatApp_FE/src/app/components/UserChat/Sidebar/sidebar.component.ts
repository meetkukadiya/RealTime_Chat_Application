import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  userName: string | null = '';
  userList: any[] = [];
  selectedUser: string | null = null;
  onlineUsers: any[] = [];

  @Output() userSelected = new EventEmitter<string>();
  @Input() activeUser: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName');

    this.fetchUsers();
  }

  fetchUsers() {
    const currentUserEmail = localStorage.getItem('userEmail');
    console.log('Current User Email:', currentUserEmail);

    this.http.get<any>('http://localhost:3001/api/all_users').subscribe({
      next: (data) => {
        this.userList =
          data?.data.filter((user: any) => user.email !== currentUserEmail) ||
          [];
        console.log('All Users ', this.userList);

        const currentUserId = localStorage.getItem('user_id');
        console.log('Current ID ', currentUserId);
        if (this.userList.length > 0) {
          const firstUserEmail = this.userList[0].email;
          // const firstUserID = this.userList[0].id;
          this.onUserClick(firstUserEmail);
        }
      },

      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  onUserClick(email: string) {
    this.selectedUser = email;
    this.userSelected.emit(email);
    console.log('Selected Email ', email);
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

}
