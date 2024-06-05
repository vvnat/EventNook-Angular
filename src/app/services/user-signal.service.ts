import { EventEmitter, Injectable, effect, inject, signal } from '@angular/core';
import { User } from '../types/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserSignalService {
  cookieService: CookieService = inject(CookieService);

  public ready = false;

  public isReady: EventEmitter<boolean> = new EventEmitter();

  private userSignal = signal({} as User);
  readonly user = this.userSignal.asReadonly();

  constructor() {
    effect(() => {
      if (this.userSignal().id) {
        this.cookieService.set('user', JSON.stringify(this.userSignal()));
      }
    });
  }

  updateUser(user: User) {
    this.userSignal.set(user);
    this.isReady.emit(true);
    this.ready = true;
  }

  clearUser() {
    this.userSignal.set({} as User);
  }
}
