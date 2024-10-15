import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ChatApp_FE';


  constructor(private router: Router) {}

  // navigateToRegister() {
  //   this.router.navigate(['/register']);
  // }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
