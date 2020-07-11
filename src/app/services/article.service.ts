import { AppGlobalService } from './app-global.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    public app: AppGlobalService
  ) { }

  getArticles(offset, tag = '') {
    return this.http.get('https://conduit.productionready.io/api/articles', {
      headers: this.app.Headers,
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
    return this.http.get('https://conduit.productionready.io/api/tags', this.app.HttpOptions);
  }

  getTagNoAuth() {
    return this.http.get('https://conduit.productionready.io/api/tags');
  }

  favoriteArticle(slug) {
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {}, this.app.HttpOptions);
  }

  unFavoriteArticle(slug) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, this.app.HttpOptions);
  }

  getFeedArticle(token) {
    return this.http.get('https://conduit.productionready.io/api/articles/feed', this.app.HttpOptions);
  }

  addArticle(payload) {
    return this.http.post('https://conduit.productionready.io/api/articles', payload, this.app.HttpOptions);
  }

  getSingleArticle(slug) {
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}`, this.app.HttpOptions);
  }

  getSingleArticleNoAuth(slug) {
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}`);
  }

  postComment(slug, payload) {
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/comments`, payload, this.app.HttpOptions)
  }

  getComment(slug) {
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}/comments`, this.app.HttpOptions)
  }


  deleteComment(slug: string, id: string) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/comments/${id}`, this.app.HttpOptions)
  }

  follow(username: string) {
    return this.http.post(`https://conduit.productionready.io/api/profiles/${username}/follow`, {}, this.app.HttpOptions)
  }

  unfollow(username: string) {
    return this.http.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`, this.app.HttpOptions)
  }

  deleteArticle(slug) {
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}`, this.app.HttpOptions);
  }

  editArticle(slug, payload) {
    return this.http.put(`https://conduit.productionready.io/api/articles/${slug}`, payload, this.app.HttpOptions);
  }
}
