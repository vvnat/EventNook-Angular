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


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, RouterLink, DatePipe, EventComponent],
    providers: [CookieService]
})
export class HomeComponent {
  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);
  user: User = JSON.parse(this.cookieService.get('user'));
  events: Event[] = [];

  userId:number = this.user.id;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.findEventsByUser(this.userId);
  }

  findEventsByUser(userId: number): void {
    this.eventService.findAllByUser(userId).subscribe(events => {
      this.events = events;
    });
  }
}
