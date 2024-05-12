import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full' ,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LoginPageComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            }
        ]
    }
];
