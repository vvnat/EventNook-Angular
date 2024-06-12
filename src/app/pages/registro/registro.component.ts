import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../types/LoginForm';
import { User } from '../../types/User';
import { CookieService } from 'ngx-cookie-service';
import { UserSignalService } from '../../services/user-signal.service';
import { UserService } from '../../services/user.service';
import { RegisterForm } from '../../types/RegisterForm';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  submited: boolean = false;
  userService: UserService = inject(UserService);
  cookieService: CookieService = inject(CookieService);

  constructor(private router: Router){}

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
  });

  getNameErrorMessage() {
    if (this.registerForm.controls.name.hasError('required')) {
      return 'Debes introducir un nombre';
    }

    if (this.registerForm.controls.name.hasError('maxlength')) {
      return 'El nombre debe tener menos de 50 caracteres';
    }

    return this.registerForm.controls.name.hasError('minlength')
      ? 'El nombre debe tener al menos 3 caracteres'
      : '';
  }

  getLastNameErrorMessage() {
    if (this.registerForm.controls.lastName.hasError('required')) {
      return 'Debes introducir un apellido';
    }

    if (this.registerForm.controls.lastName.hasError('maxlength')) {
      return 'El apellido debe tener menos de 50 caracteres';
    }

    return this.registerForm.controls.lastName.hasError('minlength')
      ? 'El apellido debe tener al menos 3 caracteres'
      : '';
  }

  getUserNameErrorMessage() {
    if (this.registerForm.controls.username.hasError('required')) {
      return 'Debes introducir un nombre de usuario';
    }

    if (this.registerForm.controls.username.hasError('maxlength')) {
      return 'El nombre de usuario debe tener menos de 50 caracteres';
    }

    return this.registerForm.controls.username.hasError('minlength')
      ? 'El nombre de usuario debe tener al menos 3 caracteres'
      : '';
  }

  getUserNameRegisteredErrorMessage() {
    this.userService.findAll().subscribe((users: User[]) => {
      if (users.find((user) => user.username === this.registerForm.controls.username.value)) {
        return 'El nombre de usuario ya está registrado';
      }else{
        return '';
      }
    });
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Debes introducir un correo electrónico';
    }

    return this.registerForm.controls.email.hasError('email')
      ? 'No es un correo valido'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'Debes introducir una contraseña';
    }

    if (this.registerForm.controls.password.hasError('maxlength')) {
      return 'La contraseña debe tener menos de 50 caracteres';
    }

    if (this.registerForm.controls.password.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }

    return '';
  }

  getRepeatPasswordErrorMessage() {
    if (
      this.registerForm.controls.password.value !==
      this.registerForm.controls.repeatPassword.value
    ) {
      return 'Las contraseñas no coinciden';
    }

    if (this.registerForm.controls.repeatPassword.hasError('required')) {
      return 'Debes repetir la contraseña';
    }

    return '';
  }

  onRegister() {
    const formValue = this.registerForm.value;
    this.submited = true;

    const registerForm: RegisterForm = {
      name: formValue.name || '',
      lastName: formValue.lastName || '',
      username: formValue.username || '',
      email: formValue.email || '',
      password: formValue.password || '',
      repeatPassword: formValue.repeatPassword || '',
      createdAt: new Date(),
    };

      this.userService.create(registerForm).subscribe(
        (user: User) => {
          this.writeUserCookie(user);
          this.userSignalService.updateUser(user);

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
    
  writeUserCookie(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
  }

  userSignalService: UserSignalService = inject(UserSignalService);
  ngOnInit(): void {
    if (this.userSignalService.user().id) {
      this.router.navigate(["/login"])
    }
  }

  }
