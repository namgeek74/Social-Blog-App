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
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  });
  error;
  submitted = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.form)
    this.submitted = true;
    this.authService.login(this.form.value).subscribe((data: User) => {
      // console.log(data);
      // console.log(this.form.value);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('bio', data.user.bio);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('image', data.user.image);
      localStorage.setItem('password', this.form.value.password);
      this.authService.user.next(true);
      this.authService.changeLogin(data.user.username, data.user.token);
    }, (error) => {
      this.error = error.error.errors['email or password'][0];
    });
  }
}
