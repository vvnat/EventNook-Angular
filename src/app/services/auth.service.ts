import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LoginForm } from "../types/LoginForm";
import { Observable } from "rxjs";
import { env } from "../env";
import { User } from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient)
  private url = `${env.apiUrl}`

  login(loginForm: LoginForm): Observable<User> {
    return this.http.post<User>(`${this.url}/authenticate`, loginForm);
  }
}