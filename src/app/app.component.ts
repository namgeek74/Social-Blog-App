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
  ) {}

  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      this.checkLoggedIn = false;
    }else {
      this.checkLoggedIn = true;
    }
    this.authService.getStatus().subscribe(status => {
      this.checkLoggedIn = status;
    })
  }
}
