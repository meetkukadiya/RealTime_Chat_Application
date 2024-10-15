import { Component } from '@angular/core';
import { NavigationService } from '../../Services/navigation.service';
import { SupabaseService } from '../../Services/supabase.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  message: string | null = null;
  error: string | null = null;
  err: string | null = null;

  constructor(
    private navigationService: NavigationService,
    private supabaseService: SupabaseService,
    private http: HttpClient,
    private router: Router
  ) {}

  async register() {
    try {
      const response = await this.http
        .post('http://localhost:3001/api/register', {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .toPromise();

      this.message =
        'Registration successful! Please check your email to confirm your account.';
      this.error = null;

      console.log('response : ==> ', response);

      this.router.navigate(['/login']); // Navigate to login page after successful registration
    } catch (err) {
      console.log(err);
      this.message = null;
      this.error = 'Registration failed. Please try again.';
    }
  }
  navigateTo(path: string) {
    this.navigationService.navigateTo(path);
  }
}
