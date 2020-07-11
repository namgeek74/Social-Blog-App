import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalService {

  constructor() { }

  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json, text/plain, */*',
      'Authorization': `Token ${localStorage.getItem('token')}`
    })
  }

  public Headers = {
    'Content-Type': 'application/json, text/plain, */*',
    'Authorization': `Token ${localStorage.getItem('token')}`
  }

  public HttpOptionsForLogin = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  }

  public HttpOptionsForSignUp = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'observe': 'response'
    })
  }

  public URLPictureDefault = 'https://static.productionready.io/images/smiley-cyrus.jpg';
}
