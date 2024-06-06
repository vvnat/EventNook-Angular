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
import { UserSignalService } from '../../services/user-signal.service';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, RouterLink, DatePipe, EventComponent, FooterComponent, LoginComponent],
    providers: [CookieService]
})
export class HomeComponent {
  
  //cookieService: CookieService = inject(CookieService);
  userSignalService: UserSignalService = inject(UserSignalService);
  userService: UserService = inject(UserService);
  user: User = {} as User;
  events: Event[] = [];

  protected get userId(): number {
    return this.userSignalService.user().id;
  }

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.userSignalService.ready){
      this.findEventsByUser(this.userId);
    }else{
      this.userSignalService.isReady.subscribe(ready => {
        this.findEventsByUser(this.userId);   
      });
    } 
  }

  findEventsByUser(userId: number): void {
    this.eventService.findAllByUser(userId).subscribe(events => {
      this.events = events;
    });
  }
}