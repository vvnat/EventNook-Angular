import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserSignalService } from './services/user-signal.service';
import { CookieService } from 'ngx-cookie-service';

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
    private userSignalService: UserSignalService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userSignalService.updateUser(JSON.parse(this.cookieService.get('user')));
    if(this.userSignalService.ready){
      this.checkUserLogged();
    }else{
      this.userSignalService.isReady.subscribe(ready => {
        this.checkUserLogged();
      });
    }
  }

  checkUserLogged(){
    if(!this.userSignalService.user().id) {
      this.router.navigate(['/login']);
    }
  }
}