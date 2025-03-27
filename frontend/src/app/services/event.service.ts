import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'    
})
export class EventService {
  private API_URL = 'http://localhost:3000/event';

  constructor(private http: HttpClient, private router: Router,private authService:AuthService) {}


  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  Add_event(formData:FormData):Observable<any>{
    return this.http.post(`${this.API_URL}/add-event`,formData);
  }

  view_event():Observable<any> {
    return this.http.get(`${this.API_URL}/view-event`,{headers:this.getHeaders(),withCredentials:true});
  }

  book_event(eventId: string,Ticket:number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.API_URL}/book/${eventId}`, {Ticket}, {headers:this.getHeaders() });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/views`);
  }
}

