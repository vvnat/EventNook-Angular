import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Catering } from "../types/Catering";
import { env } from "../env";

@Injectable({
    providedIn: 'root'
  })
  export class CateringService {
    private url = env.apiUrl;
  
    constructor(
      private http: HttpClient
    ) { }
  
    findAll(): Observable<Catering[]> {
      return this.http.get<Catering[]>(`${this.url}/caterings`);
    }

    findByEventType(eventType: number): Observable<Catering[]> {
      return this.http.get<Catering[]>(`${this.url}/caterings/${eventType}`);
    }
  
    findById(cateringId: number): Observable<Catering> {
      return this.http.get<Catering>(`${this.url}/catering/${cateringId}`);
    }
  }