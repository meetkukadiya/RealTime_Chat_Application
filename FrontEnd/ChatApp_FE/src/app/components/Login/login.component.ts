import { Component } from '@angular/core';
import { NavigationService } from '../../Services/navigation.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private http: HttpClient
  ) {}

  async login() {
    try {
      const response: any = await this.http
        .post('http://localhost:3001/api/login', {
          email: this.email,
          password: this.password,
        })
        .toPromise();

      this.message = 'Login successful!';
      this.error = null;

      console.log('response : ==> ', response);

      const user_Token = response.data.session.access_token;
      const user_id = response.data.session.user.id;
      const userName = response.data.user.user_metadata.username;
      const userEmail = response.data.user.user_metadata.email;

      console.log('User Token: ==>', user_Token);
      console.log('User ID: ==>', user_id);
      console.log('User Name: ==>', userName);
      console.log('User Email: ==>', userEmail);

      localStorage.setItem('access_token', user_Token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', userEmail);

      // Navigate to chat page after successful login
      this.router.navigate(['/chat']);
    } catch (err) {
      console.log(err);
      this.message = null;
      this.error = 'Login failed. Please check your credentials and try again.';
    }
  }

  navigateTo(path: string) {
    this.navigationService.navigateTo(path);
  }
}
