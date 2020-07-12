import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobalService } from '../core/services/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    public app: AppGlobalService
  ) { }

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
      headers: this.app.Headers
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
      headers: this.app.Headers
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
    return this.http.post(`https://conduit.productionready.io/api/profiles/${username}/follow`, {}, this.app.HttpOptions);
  }

  unfollow(username: string) {
    return this.http.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`, this.app.HttpOptions)
  }

  like(slug) {
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {}, this.app.HttpOptions);
  }

  unlike(slug) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, this.app.HttpOptions);
  }

  updateProfile(payload) {
    return this.http.put('https://conduit.productionready.io/api/user', {
      'user': payload
    }, this.app.HttpOptions);
  }
}
