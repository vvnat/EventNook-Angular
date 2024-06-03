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
  protected eventTypes: string[] = ["Bodas y comuniones", "Cenas y comidas de empresa","Congresos, conferencias y charlas", "Conciertos"];
  protected spaceImageUrl: string = "";
  protected restaurantImageUrl: string = "";
  protected events: Event[] = [];
  protected spaceName: string = "";
  protected restaurantName: string = "";

  constructor(
    private eventService: EventService,
    public spaceService: SpaceService,
    public restaurantService: RestaurantService
  ) { }

   now: Date = new Date();

    ngOnInit(): void {
      console.log("Today date: "+this.now);
      this.eventService.findAll().subscribe({
        next: (response: Event[]) => {
          this.events = response.filter((event) => event.endDate <= this.now);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
      this.findSpaceNameById(this.event.spaceId||1);
      this.getRestaurantName(this.event.restaurantId||1);
      this.getSpaceImageUrl(this.event.spaceId||1);
      this.getRestaurantImageUrl(this.event.restaurantId||1);
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

getSpaceImageUrl(spaceId: number): void {
  this.spaceService.findById(spaceId).subscribe((space) => {
    this.spaceImageUrl = space.image;
  });
}

getRestaurantImageUrl(restaurantId: number): void {
  this.restaurantService.findById(restaurantId).subscribe((restaurant) => {
    this.restaurantImageUrl = restaurant.image;
  });
}

}