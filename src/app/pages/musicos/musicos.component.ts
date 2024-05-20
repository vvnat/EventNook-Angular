import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavComponent } from '../../nav/nav.component';
import { MusicianService } from '../../services/musician.service';
import { Musician } from '../../types/Musician';

@Component({
  selector: 'app-musicos',
  standalone: true,
  imports: [HeaderComponent, NavComponent],
  templateUrl: './musicos.component.html',
  styleUrl: './musicos.component.css'
})
export class MusicosComponent implements OnInit{
  protected musicians: Musician[] = [];
  protected paginatedMusicians: Musician[] = [];

  protected pageSize: number = 10;
  protected pageIndex: number = 0;

  constructor(
    private musicianService: MusicianService
  ) { }

  ngOnInit(): void {
    this.musicianService.findAll().subscribe({
      next: (response: Musician[]) => {
        console.log(response);
        this.musicians = response;
        this.paginatedMusicians = this.musicians.slice(this.pageIndex, this.pageSize);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  nextPage(): void {
    this.pageIndex += this.pageSize;
    this.paginatedMusicians = this.musicians.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  prevPage(): void {
    this.pageIndex -= this.pageSize;
    this.paginatedMusicians = this.musicians.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  findByMusicianId(musicianId: number): void {
    this.musicianService.findById(musicianId).subscribe({
      next: (response: Musician) => {
        console.log(response);
        this.musicians = [response];
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
