import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Restaurant } from "../types/Restaurant";
import { env } from "../env";

@Injectable({
    providedIn: 'root'
  })
  export class RestaurantService {
    private url = env.apiUrl;
  
    constructor(
      private http: HttpClient
    ) { }
  
    findAll(): Observable<Restaurant[]> {
      return this.http.get<Restaurant[]>(`${this.url}/restaurants`);
    }
  
    findById(restaurantId: number): Observable<Restaurant> {
      return this.http.get<Restaurant>(`${this.url}/restaurant/${restaurantId}`);
    }
  }