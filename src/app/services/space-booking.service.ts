import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SpaceBooking } from "../types/SpaceBooking";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})

export class SpaceBookingService {
    private url = env.apiUrl;
  
    constructor(
      private http: HttpClient
    ) { }
  
    findAll(): Observable<SpaceBooking[]> {
      return this.http.get<SpaceBooking[]>(`${this.url}/reservasEspacios`);
    }

    findById(spaceId: number): Observable<SpaceBooking> {
      return this.http.get<SpaceBooking>(`${this.url}/reservasEspacios/${spaceId}`);
    }

}