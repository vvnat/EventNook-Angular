import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MusicianBooking } from "../types/MusicianBooking";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})

export class MusicianBookingService {
    private url = env.apiUrl;
  
    constructor(
      private http: HttpClient
    ) { }
  
    findAll(): Observable<MusicianBooking[]> {
      return this.http.get<MusicianBooking[]>(`${this.url}/reservasMusicos`);
    }

    findById(musicianId: number): Observable<MusicianBooking> {
      return this.http.get<MusicianBooking>(`${this.url}/reservasMusicos/${musicianId}`);
    }

}