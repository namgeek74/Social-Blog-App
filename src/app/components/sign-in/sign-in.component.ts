import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.minLength(8), Validators.required])
  });
  error;
  submitted = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.form.value).subscribe((data: User) => {
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('bio', data.user.bio);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('image', data.user.image);
      localStorage.setItem('password', this.form.value.password);
      this.authService.changeLogin(data.user.username, data.user.token);
      this.authService.updateStatusAuth.emit(true);
    }, (error) => {
      this.error = error.error.errors['email or password'][0];
    });
  }
}
