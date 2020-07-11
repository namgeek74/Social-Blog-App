import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  checkLoggedIn: boolean;
  username = localStorage.getItem('username');

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkLogin();

    // this.authService.getStatus().subscribe(status => {
    //   this.checkLoggedIn = status;
    // })

    this.authService.updateStatusAuth.subscribe(data => {
      if (data) {
        this.checkLogin();
      }
    })
  }

  checkLogin() {
    if (localStorage.getItem('token') === null) {
      this.checkLoggedIn = false;
    } else {
      this.checkLoggedIn = true;
    }
  }
}
