import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

constructor(private eventService: EventService, private router: Router) { }

SeeEvents(){
  this.router.navigate(['/view'])
}

SeeBookings(){
  this.router.navigate(['/user-view'])
}

}
