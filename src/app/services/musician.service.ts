import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Musician } from "../types/Musician";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})
export class MusicianService{
    private url = env.apiUrl;

    constructor(
        private http: HttpClient
      ) { }

      findAll(): Observable<Musician[]> {
    return this.http.get<Musician[]>(`${this.url}/musicians`);
    }

    findByEventType(eventType: number): Observable<Musician[]> {
    return this.http.get<Musician[]>(`${this.url}/musicians/${eventType}`);
    }

    findById(musicianId: number): Observable<Musician> {
        return this.http.get<Musician>(`${this.url}/musician/${musicianId}`);
    }
}