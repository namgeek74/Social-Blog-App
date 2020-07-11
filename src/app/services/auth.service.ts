import { AppGlobalService } from './app-global.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEmit = new EventEmitter<any>();
  user = new Subject<boolean>();
  updateStatusAuth = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router,
    public app: AppGlobalService
  ) { }

  login(payload) {
    return this.http.post('https://conduit.productionready.io/api/users/login', {
      'user': payload
    }, this.app.HttpOptionsForLogin);
  }

  signUp(payload) {
    return this.http.post('https://conduit.productionready.io/api/users', {
      'user': payload
    }, this.app.HttpOptionsForSignUp);
  }

  changeLogin(userName, token) {
    if (userName) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem('token');
    }
    // this.loginEmit.emit(userName);
    this.router.navigate(['/']);
  }

  // sendStatus(status: boolean) {
  //   this.user.next(status);
  // }

  // getStatus() {
  //   return this.user.asObservable();
  // }
}
