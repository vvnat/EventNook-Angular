import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CateringService } from '../../services/catering.service';
import { Catering } from '../../types/Catering';

@Component({
  selector: 'app-caterings',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './caterings.component.html',
  styleUrl: './caterings.component.css'
})
export class CateringsComponent implements OnInit{
  protected caterings: Catering[] = [];
  protected paginatedCaterings: Catering[] = [];

  protected pageSize: number = 10;
  protected pageIndex: number = 0;

  constructor(
    private cateringService: CateringService
  ) { }

  ngOnInit(): void {
    this.cateringService.findAll().subscribe({
      next: (response: Catering[]) => {
        console.log(response);
        this.caterings = response;
        this.paginatedCaterings = this.caterings.slice(this.pageIndex, this.pageSize);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  nextPage(): void {
    this.pageIndex += this.pageSize;
    this.paginatedCaterings = this.caterings.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  prevPage(): void {
    this.pageIndex -= this.pageSize;
    this.paginatedCaterings = this.caterings.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  findByCateringId(cateringId: number): void {
    this.cateringService.findById(cateringId).subscribe({
      next: (response: Catering) => {
        console.log(response);
        this.caterings = [response];
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
