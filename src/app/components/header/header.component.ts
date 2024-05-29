import { Component, inject } from '@angular/core';
import {MatSelect} from '@angular/material/select';
import { MatFormField } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSelect, MatFormField, MatOption, RouterLink, DropdownModule],
  providers: [CookieService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);

  opciones = [ 
    { name: "Espacios", url: "/spaces" }, 
    { name: "Caterings", url: "/caterings" }, 
    { name: "Músicos", url: "/musicians" }, 
    { name: "Restaurantes", url: "/restaurants" },
  ]; 

  router: Router = inject(Router);

  onChange(event: any) {
    console.log('event :' + event);
    console.log(event.value);
    this.router.navigate([event.value.url]); 
}

 /* user: User = JSON.parse(this.cookieService.get('user'));

  username:string = this.user.username || "";

  userImg:string = this.user.image ||"https://pub-075bb5be9b9a4349baac38abf6b858f4.r2.dev/user-default.png";*/
}
