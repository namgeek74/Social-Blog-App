import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/model';
import { AppGlobalService } from 'src/app/core/services/app-global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  checkLoggedIn: boolean = localStorage.getItem('token') === null ? false : true;
  listArticles: Article[];
  tags;
  countArticles: number;
  countPages: number;
  pages = [];
  offset = 0;
  currentIndex = 0;
  statusTab = false;
  nameTag: string;
  statusGlobal = true;
  statusYourFeed: boolean = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    public app: AppGlobalService
  ) { }

  ngOnInit() {
    if (this.checkLoggedIn) {
      this.articleService.getArticles(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
      })

      this.articleService.getTags().subscribe(data => {
        this.tags = data['tags'];
      })
    } else {
      this.articleService.getArticleNoAuth(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
      })

      this.articleService.getTagNoAuth().subscribe(data => {
        this.tags = data['tags'];
      })
    }

  }

  handlePagination(i) {
    this.articleService.getArticles(i).subscribe(data => {
      this.listArticles = data['articles'];
    })
    this.currentIndex = i;
  }

  handleTag(tag) {
    if (!this.checkLoggedIn) {
      this.articleService.getArticleNoAuth(this.offset, tag).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
      })
      this.statusTab = true;
      this.nameTag = tag;
      this.statusGlobal = false;
      this.statusYourFeed = false;
    } else {
      this.articleService.getArticles(this.offset, tag).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
      })
      this.statusTab = true;
      this.nameTag = tag;
      this.statusGlobal = false;
      this.statusYourFeed = false;
    }

  }

  handleGlobal() {
    if (!this.checkLoggedIn) {
      this.statusGlobal = true;
      this.statusYourFeed = false;
      this.statusTab = false;
      this.articleService.getArticleNoAuth(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
      })
    } else {
      this.statusGlobal = true;
      this.statusYourFeed = false;
      this.statusTab = false;
      this.articleService.getArticles(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
      })
    }

  }

  handleEditor(slug) {
    this.router.navigate(['article', slug]);
  }

  handleFavorite(slug, checkFavorite, i) {
    if (!this.checkLoggedIn) {
      this.router.navigate(['/register']);
    } else {
      this.listArticles = this.listArticles.map((item, index) => {
        if (index === i) {
          checkFavorite ? item.favoritesCount-- : item.favoritesCount++;
          item.favorited = !item.favorited;
        }
        return item;
      })
      checkFavorite ? this.articleService.unFavoriteArticle(slug).subscribe() : this.articleService.favoriteArticle(slug).subscribe();
    }

  }


  handleYourFeed() {
    this.articleService.getFeedArticle().subscribe(data => {
      this.statusYourFeed = true;
      this.statusGlobal = false;
      this.statusTab = false;
      this.listArticles = data['articles'];
      this.countArticles = data['articlesCount'];
    })
  }
}
