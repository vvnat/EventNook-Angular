import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../types/LoginForm';
import { User } from '../../types/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    const form: LoginForm = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }

    this.authService.login(form).subscribe({
      next: (data: User) => {
        this.router.navigate(["/home"]);
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
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
}