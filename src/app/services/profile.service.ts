import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(username) {
    return this.http.get(`https://conduit.productionready.io/api/profiles/${username}`);
  }

  getArticles(author, offset) {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      params: {
        author: author,
        limit: '5',
        offset: offset
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }

  getArticleNoAuth(author, offset) {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      params: {
        author: author,
        limit: '5',
        offset: offset
      }
    })
  }

  getFavorited(author, offset) {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      params: {
        favorited: author,
        limit: '5',
        offset: offset
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }

    });
  }

  getFavoritedNoAuth(author, offset) {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      params: {
        favorited: author,
        limit: '5',
        offset: offset
      }
    });
  }

  follow(username: string) {
    return this.http.post(`https://conduit.productionready.io/api/profiles/${username}/follow`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }

  unfollow(username: string) {
    return this.http.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }

  like(slug) {
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      // obj để lưu sự thay đổi của data, không thay đổi gì nên để rỗng
    }, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  unlike(slug) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  updateProfile(value) {
    console.log(value);

    return this.http.put('https://conduit.productionready.io/api/user', {
      'user': value
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }
}
