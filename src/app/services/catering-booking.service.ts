import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CateringBooking } from "../types/CateringBooking";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})

export class CateringBookingService {
    private url = env.apiUrl;
  
    constructor(
      private http: HttpClient
    ) { }
  
    findAll(): Observable<CateringBooking[]> {
      return this.http.get<CateringBooking[]>(`${this.url}/reservasCaterings`);
    }

    findById(cateringId: number): Observable<CateringBooking> {
      return this.http.get<CateringBooking>(`${this.url}/reservasCaterings/${cateringId}`);
    }

}