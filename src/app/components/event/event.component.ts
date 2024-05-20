import { Component, Input } from '@angular/core';
import { Event } from '../../types/Event';
import { EventService } from '../../services/event.service';
import { OnInit } from '@angular/core';
import { SpaceService } from '../../services/space.service';
import { RestaurantService } from '../../services/restaurant.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {
  @Input() event: Event = {} as Event;
  protected eventTypes: string[] = ["Boda", "Cena de empresa","Congreso", "Concierto"];
  protected events: Event[] = [];
  protected spaceName: string = "";
  protected restaurantName: string = "";

  constructor(
    private eventService: EventService,
    public spaceService: SpaceService,
    public restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.eventService.findAllByUser(2).subscribe({
      next: (response: Event[]) => {
        console.log(response);
        this.events = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
    this.findSpaceNameById(this.event.spaceId||0);
    this.getRestaurantName(this.event.restaurantId||0);
}

findSpaceNameById(spaceId: number): void {
  this.spaceService.findById(spaceId).subscribe((space) => {
    this.spaceName = space.name;
  });
}

getRestaurantName(restaurantId: number): void {
  this.restaurantService.findById(restaurantId).subscribe((restaurant) =>{
    this.restaurantName = restaurant.name;
  });
}
}
