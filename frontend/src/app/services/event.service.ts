import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'    
})
export class EventService {
  private API_URL = 'http://localhost:3000/event';

  constructor(private http: HttpClient, private router: Router) {}

  private header_options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  Add_event(name:string,Event_date:Date,Event_id:string,ticket_price:Number,venue:string,description:string,image_url:string,type:any,avail_ticket:Number):Observable<any>{
    return this.http.post(`${this.API_URL}/add-event`, {name, Event_date, Event_id, ticket_price, venue ,description ,image_url ,type,avail_ticket}, this.header_options);
  }

  view_event():Observable<any> {
    return this.http.get(`${this.API_URL}/view-event`);
  }
}

