import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "../types/Event";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = env.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  findAllByUser(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}/events/${userId}`);
  }

  findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}/events`);
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.url}/events`, event);
  }
}