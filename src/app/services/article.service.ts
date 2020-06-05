import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    })
  }


  constructor(private http: HttpClient) { }

  getArticles(offset, tag = '') {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      params: {
        limit: '10',
        offset: offset,
        tag: tag
      }
    });
  }

  getArticleNoAuth(offset, tag = '') {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      params: {
        limit: '10',
        offset: offset,
        tag: tag
      }
    });
  }

  getTags() {
    return this.http.get('https://conduit.productionready.io/api/tags', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    });
  }

  getTagNoAuth() {
    return this.http.get('https://conduit.productionready.io/api/tags');
  }

  favoriteArticle(slug) {
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      // obj để lưu sự thay đổi của data, không thay đổi gì nên để rỗng
    }, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  unFavoriteArticle(slug) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  getFeedArticle(token) {
    return this.http.get('https://conduit.productionready.io/api/articles/feed', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Token ${token}`
      }
    })
  }

  addArticle(data) {
    return this.http.post('https://conduit.productionready.io/api/articles', data, this.httpOptions);
  }

  getSingleArticle(slug) {
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}`, this.httpOptions);
  }

  getSingleArticleNoAuth(slug) {
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}`);
  }

  // favoriteArticle(slug) {
  //   return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {}, this.httpOptions);
  // }

  // unFavoriteArticle(slug) {
  //   return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, this.httpOptions);
  // }

  postComment(slug, comment) {
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/comments`, comment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }

  getComment(slug) {
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }

  
  deleteComment(slug: string, id: string) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/comments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
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

  deleteArticle(slug) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }

  editArticle(slug, data) {
    return this.http.put(`https://conduit.productionready.io/api/articles/${slug}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }
}
