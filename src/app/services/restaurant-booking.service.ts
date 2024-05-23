import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestaurantBooking } from "../types/RestaurantBooking";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})

export class RestaurantBookingService {
    private url = env.apiUrl;
  
    constructor(
      private http: HttpClient
    ) { }
  
    findAll(): Observable<RestaurantBooking[]> {
      return this.http.get<RestaurantBooking[]>(`${this.url}/reservasRestaurantes`);
    }

  /*  findById(restaurantId: number): Observable<RestaurantBooking> {
      return this.http.get<RestaurantBooking>(`${this.url}/reservasRestaurantes/${restaurantId}`);
    }*/

    findByDateRange(startDate: string, endDate: string): Observable<RestaurantBooking[]> {
        return this.http.get<RestaurantBooking[]>(`${this.url}/reservasRestaurantes/${startDate}/${endDate}`);
    }

}