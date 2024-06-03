import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LoginForm } from "../types/LoginForm";
import { BehaviorSubject, Observable } from "rxjs";
import { env } from "../env";
import { User } from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient)
  private url = `${env.apiUrl}`
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  loggedIn$ = this.loggedIn.asObservable();

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  login(loginForm: LoginForm): Observable<User> {
    return this.http.post<User>(`${this.url}/authenticate`, loginForm);
  }
}