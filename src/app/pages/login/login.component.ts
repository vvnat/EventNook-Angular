import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../types/LoginForm';
import { User } from '../../types/User';
import { CookieService } from 'ngx-cookie-service';
import { UserSignalService } from '../../services/user-signal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  cookieService: CookieService = inject(CookieService);
  loginError: boolean = false;
  submited: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  userSignalService: UserSignalService = inject(UserSignalService);
  ngOnInit(): void {
    if (this.userSignalService.user().id) {
      this.router.navigate(["/home"])
    }
  }

  onLogin() {
    const fomrValue = this.loginForm.value;
    this.submited = true;

    const form: LoginForm = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }

    this.authService.login(form).subscribe({
      next: (user: User) => {
        this.writeUserCookie(user as User);
        this.userSignalService.updateUser(user as User);
        setTimeout(() => {
          this.router.navigate(["/home"])
        }, 500);
        console.log(user);
      },
      error: (error: any) => {
        console.log(error);
        this.loginError = true;
      }
    })
  }

  getUsernameErrors() {
    if (this.loginForm.controls.username.hasError('required')) return 'El campo es requerido.';
    return '';
  }

  getPasswordErrors() {
    if (this.loginForm.controls.password.hasError('required')) return 'El campo es requerido.';
    return '';
  }

  getLoginError(){
    if (this.loginError) return 'Usuario o contraseña incorrectos.';
    return '';
  }

  writeUserCookie(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
  }
}