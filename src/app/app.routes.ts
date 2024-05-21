import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EspaciosComponent } from './pages/espacios/espacios.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { CateringsComponent } from './pages/caterings/caterings.component';
import { MusicosComponent } from './pages/musicos/musicos.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'spaces',
    component: EspaciosComponent
  },
  {
    path: 'restaurants',
    component: RestaurantesComponent
  },
  {
    path: 'caterings',
    component: CateringsComponent
  },
  {
    path: 'musicians',
    component: MusicosComponent
  }
];