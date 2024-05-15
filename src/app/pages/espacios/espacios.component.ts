import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {SpaceService} from '../../services/space.service';
import {Space} from '../../types/Space';

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './espacios.component.html',
  styleUrl: './espacios.component.css'
})
export class EspaciosComponent implements OnInit{
  protected spaces: Space[] = [];

  protected eventTypes: string[] = ["Boda", "Cena de empresa","Congreso", "Concierto"];

  constructor(
    private spaceService: SpaceService
  ) { }

  ngOnInit(): void {
      this.spaceService.findAll().subscribe({
        next: (response: Space[]) => {
          console.log(response);
          this.spaces = response;
        },
        error: (error: any) => {
          console.log(error);
        }
      })
  }

  spacesByEventType(eventType: number): void {
    this.spaceService.findByEventType(eventType).subscribe({
      next: (response: Space[]) => {
        console.log(response);
        this.spaces = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  spaceById(spaceId: number): void {
    this.spaceService.findById(spaceId).subscribe({
      next: (response: Space) => {
        console.log(response);
        this.spaces = [response];
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
