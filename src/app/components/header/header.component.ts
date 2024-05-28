import { Component, inject } from '@angular/core';
import {MatSelect} from '@angular/material/select';
import { MatFormField } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSelect, MatFormField, MatOption, RouterLink],
  providers: [CookieService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);
 /* user: User = JSON.parse(this.cookieService.get('user'));

  username:string = this.user.username || "";

  userImg:string = this.user.image ||"https://pub-075bb5be9b9a4349baac38abf6b858f4.r2.dev/user-default.png";*/
}
