import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;
  constructor(private http: HttpClient, private router: Router){
    this.loginObj = new Login("","");
  }

  onLogin(){
    this.http.post("http://localhost:8888/api/v1/authenticate", this.loginObj).subscribe({
      next: (data: any) => {
        this.router.navigateByUrl("/home", {state: {data: data}});
      }});
      error: (error: any) => {
        console.log(error);
      }
  }
}

export class Login{
  username: string;
  password: string;
  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }
}