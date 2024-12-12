import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../state/auth.actions';
import { Router } from '@angular/router';
import { selectIsAuthenticated } from '../../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  onLogin() {
    this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));

   
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/tasks']); 
      }
    });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']); 
  }
}
