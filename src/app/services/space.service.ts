import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Space } from "../types/Space";
import { env } from "../env";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
    private url = env.apiUrl;

    constructor(
        private http: HttpClient
      ) { }

    findAll(): Observable<Space[]> {
        return this.http.get<Space[]>(`${this.url}/spaces`);
    }

    findByEventType(eventType: number): Observable<Space[]> {
        return this.http.get<Space[]>(`${this.url}/spaces/${eventType}`);
    }

    findById(spaceId: number): Observable<Space> {
        return this.http.get<Space>(`${this.url}/space/${spaceId}`);
    }
}