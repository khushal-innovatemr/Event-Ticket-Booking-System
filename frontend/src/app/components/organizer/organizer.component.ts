import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.css'
})
export class OrganizerComponent {
events: any; 
  noeventmessage: any;

constructor(private eventService: EventService, private router: Router) { }

ngOnInit():void{
  this.OrganizerView();
}

OrganizerView():void{
  this.eventService.organize_view().subscribe({
    next: (res: any) => {
      if (res.message) {
        console.log('No Events message:', res.message);
        this.events = [];
        this.noeventmessage = res.message;
      } else {
        this.events = res;
        console.log(this.events.image_url);
        console.log(res);

        this.events.forEach((v: any) => {
          // console.log('Event ID:', v.Event_id);
        });
      }
    },
    error: (err) => {
      console.error('Error fetching events:', err);
    }
  });
}


}

