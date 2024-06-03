import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventService } from '../../services/event.service';
import { RouterLink } from '@angular/router';
import { Event } from '../../types/Event';
import { DatePipe } from '@angular/common';
import { EventComponent } from '../../components/event/event.component';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../types/User';
import { UserService } from '../../services/user.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, RouterLink, DatePipe, EventComponent, FooterComponent, LoginComponent],
    providers: [CookieService]
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  
  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);
  user: User = {} as User;
  events: Event[] = [];

  userId:number = 0;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      try {
        this.user = JSON.parse(userCookie);
        this.userId = this.user.id;
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
    this.authService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.findEventsByUser(this.userId);
    console.log(this.userId);
  }

  findEventsByUser(userId: number): void {
    this.eventService.findAllByUser(userId).subscribe(events => {
      this.events = events;
    });
  }
}
