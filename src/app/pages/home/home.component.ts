import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavComponent } from '../../nav/nav.component';
import { EventService } from '../../services/event.service';
import { RouterLink } from '@angular/router';
import { Event } from '../../types/Event';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EventComponent } from '../../components/event/event.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, NavComponent, RouterLink, DatePipe, EventComponent]
})
export class HomeComponent {
  events: Event[] = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.findEventsByUser(1);
  }

  findEventsByUser(userId: number): void {
    this.eventService.findAllByUser(userId).subscribe(events => {
      this.events = events;
    });
  }
}
