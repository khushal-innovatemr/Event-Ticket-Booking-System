import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  flag: boolean = false;
  tasks: any;
  user: any;

  constructor(private authService: AuthService, private eventService:EventService,private router: Router) {}

  adminregister(): void {
    this.router.navigate(['/admin-register']);
  }


  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout(): void {
    this.authService.logout();
  }

  CheckUser(): void {
    if(this.flag){
      this.flag = !this.flag
      this.eventService.getUsers().subscribe({
        next: (res: any) => {
          this.tasks = res; 
      },
        error: (error: any) => {
          console.error('Error Fetching Users', error);
      }
    });
  }
else{
  this.tasks=[]
  this.flag=!this.flag
}}
  

}
