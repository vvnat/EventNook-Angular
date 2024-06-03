import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../types/Restaurant';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './restaurantes.component.html',
  styleUrl: './restaurantes.component.css'
})
export class RestaurantesComponent implements OnInit{

  isLoggedIn: boolean = false;

  protected restaurants: Restaurant[] = [];
  protected paginatedRestaurants: Restaurant[] = [];

  protected pageSize: number = 6;
  protected pageIndex: number = 0;


  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.restaurantService.findAll().subscribe({
      next: (response: Restaurant[]) => {
        console.log(response);
        this.restaurants = response;
        this.paginatedRestaurants = this.restaurants.slice(this.pageIndex, this.pageSize);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  nextPage(): void {
    this.pageIndex += this.pageSize;
    this.paginatedRestaurants = this.restaurants.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  prevPage(): void {
    this.pageIndex -= this.pageSize;
    this.paginatedRestaurants = this.restaurants.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  findByRestaurantId(restaurantId: number): void {
    this.restaurantService.findById(restaurantId).subscribe({
      next: (response: Restaurant) => {
        console.log(response);
        this.restaurants = [response];
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
