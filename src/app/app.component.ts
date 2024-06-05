import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserSignalService } from './services/user-signal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EventNook-Angular';

  constructor(
    private router: Router,
    private userSignalService: UserSignalService
  ) {}

  ngOnInit(): void {
      if(!this.userSignalService.user().id) {
        this.router.navigate(['/login']);
      }
  }
}
