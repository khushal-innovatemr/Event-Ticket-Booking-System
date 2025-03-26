import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

  name = '';
  Event_date:any; 
  Event_id:any;
  ticket_price:any;
  venue:any ;
  description:any;
  image_url:any ;
  avail_ticket:any;
  successMessage:any = '';
  errorMessage: any;
  type: any;

  constructor(private eventService: EventService, private router: Router) {}

  add(): void {
    this.eventService.Add_event(this.name,this.Event_date, this.Event_id,this.ticket_price,this.venue,this.description,this.image_url,this.type,this.avail_ticket).subscribe({
      next: (v) => {
        console.log(v);
        this.successMessage = 'Event Created!';
        this.router.navigate(['/view']);
      },
      error: (err) => (this.errorMessage = err.error.error)
    });
    this.resetForm();
  }
  
  resetForm() {
    this.name = '';
    this.description = '';
    this.Event_date = null
    this.Event_id = ''
    this.ticket_price = '';
    this.venue = '';
    this.type = '';
    this.image_url = '';
    this.avail_ticket = '';

  }

}
