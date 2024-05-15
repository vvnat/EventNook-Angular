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

  protected pageSize: number = 6;
  protected pageIndex: number = 0;

  constructor(
    private spaceService: SpaceService
  ) { }

  ngOnInit(): void {
    this.loadSpaces();
  }

  loadSpaces(): void {
    this.spaceService.findAll().subscribe({
      next: (response: Space[]) => {
        console.log(response);
        this.spaces = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getPagedSpaces(): Space[] {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.spaces.slice(startIndex, endIndex);
  }

  nextPage(): void {
    this.pageIndex++;
  }

  prevPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
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
