import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEmit = new EventEmitter<any>();
  url;
  body;
  user = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(value) {
    return this.http.post('https://conduit.productionready.io/api/users/login', {
      'user': value
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  signUp(value) {
    return this.http.post('https://conduit.productionready.io/api/users', {
      'user': value
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'observe': 'response'
      }
    })
  }

  changeLogin(userName, token) {
    if (userName) {
      localStorage.setItem("token", token);
      console.log(userName);

      // localStorage.setItem('username', userName);

    } else {
      localStorage.removeItem('token');
    }
    this.loginEmit.emit(userName);
    this.router.navigate(['/']);
  }

  sendStatus(status: boolean) {
    this.user.next(status);
  }

  getStatus() {
    return this.user.asObservable();
  }
}
