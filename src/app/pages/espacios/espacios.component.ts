import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {SpaceService} from '../../services/space.service';
import {Space} from '../../types/Space';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './espacios.component.html',
  styleUrl: './espacios.component.css'
})
export class EspaciosComponent implements OnInit{
  protected spaces: Space[] = [];
  protected paginatedSpaces: Space[] = [];

  protected eventTypes: string[] = ["Boda", "Cena de empresa","Congreso", "Concierto"];

  protected pageSize: number = 6;
  protected pageIndex: number = 0;

  constructor(
    private spaceService: SpaceService
  ) { }

  ngOnInit(): void {
    this.spaceService.findAll().subscribe({
      next: (response: Space[]) => {
        console.log(response);
        this.spaces = response;
        this.paginatedSpaces = this.spaces.slice(this.pageIndex, this.pageSize);
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

  nextPage(): void {
    this.pageIndex += this.pageSize;
    this.paginatedSpaces = this.spaces.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  prevPage(): void {
    this.pageIndex -= this.pageSize;
    this.paginatedSpaces = this.spaces.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }
}
