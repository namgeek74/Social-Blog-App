import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  data;
  changed: boolean;
  submitted = false;

  form = new FormGroup({
    email: new FormControl(localStorage.getItem('email'), [Validators.required]),
    username: new FormControl(localStorage.getItem('username'), [Validators.required]),
    password: new FormControl(localStorage.getItem('password'), [Validators.required]),
    bio: new FormControl(localStorage.getItem('bio') === 'null' ? '' : localStorage.getItem('bio'),
      [Validators.email, Validators.required]),
    image: new FormControl(localStorage.getItem('image') === 'null' ? '' : localStorage.getItem('image'),
      [Validators.minLength(8), Validators.required, Validators.maxLength(20)])
  });

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    // this.auth.sendStatus(false);
    this.auth.updateStatusAuth.emit(true);
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.profileService.updateProfile(this.form.value).subscribe((data: User) => {
      this.submitted = true;
      localStorage.setItem('username', this.form.value.username);
      localStorage.setItem('email', this.form.value.email);
      localStorage.setItem('bio', this.form.value.bio);
      localStorage.setItem('image', this.form.value.image);
      localStorage.setItem('password', this.form.value.password);
      this.router.navigate(['/profile', data.user.username]);
    }, (error) => {
      console.log(error);
    });
  }

  canDeactive(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.dirty && this.submitted === false) {
      return confirm('Are u stupid ?');
    }
    return true;
  }
}
