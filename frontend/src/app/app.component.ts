import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Event App';
  
  constructor(
    private authService:AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout(): void {
    this.authService.logout();
  }
}

