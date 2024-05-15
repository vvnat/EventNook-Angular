import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../types/Event';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  protected events: Event[] = [];

  protected eventTypes: string[] = ["Boda", "Cena de empresa","Congreso", "Concierto"];

  constructor(
    private eventService: EventService
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
  }
}
