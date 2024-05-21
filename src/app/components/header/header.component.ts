import { Component, inject } from '@angular/core';
import {MatSelect} from '@angular/material/select';
import { MatFormField } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../types/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSelect, MatFormField, MatOption],
  providers: [CookieService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);
  user: User = JSON.parse(this.cookieService.get('user'));

  username:string = this.user.username || "";
}
