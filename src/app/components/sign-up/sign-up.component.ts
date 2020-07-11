import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.minLength(8), Validators.required, Validators.maxLength(20)])
  })
  submitted = false;
  error;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.authService.signUp(this.form.value).subscribe((data: User) => {
      this.authService.updateStatusAuth.emit(true);

      this.authService.changeLogin(data.user.username, data.user.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('bio', data.user.bio);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('image', data.user.image);
      localStorage.setItem('password', this.form.value.password);
    }, (error) => {
      this.error = Object.keys(error.error.errors);
    });
  }

}
