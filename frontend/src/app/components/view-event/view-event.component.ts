import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  events: any = [];
  noeventmessage: string = '';
  noTaskMessage: any;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.SeeEvents();
  }

  SeeEvents(): void {
    this.eventService.view_event().subscribe({
      next: (res: any) => {
        if (res.message) {
          console.log('No Events message:', res.message);
          this.events = [];
          this.noeventmessage = res.message;
        } else {
          this.events = res;
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }
}