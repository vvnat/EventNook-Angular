import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../types/Event';
import { SpaceService } from '../../services/space.service';
import { get } from 'http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  protected events: Event[] = [];
  protected spaceName: string = "";

  protected eventTypes: string[] = ["Boda", "Cena de empresa","Congreso", "Concierto"];

  constructor(
    private eventService: EventService,
    public spaceService: SpaceService
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
      this.getSpaceName(1);
  }

  getSpaceName(spaceId: number): void {
    this.spaceService.findById(spaceId).subscribe({
      next: (space: any) => {
        console.log(space);
        this.spaceName = space.name;
        return this.spaceName;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
