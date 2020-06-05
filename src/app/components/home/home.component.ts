import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  checkLoggedIn: boolean = localStorage.getItem('token') === null ? false : true;
  token: string = localStorage.getItem('token');
  listArticles: Article[];
  urlPic = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  tags;
  countArticles: number;
  countPages: number;
  pages = [];
  offset = 0;
  currentIndex = 0;
  checkTabTag = false;
  nameTag: string;
  global = true;
  checkYourFeed: boolean = false;

  constructor(private getArticle: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.checkLoggedIn) {
      this.getArticle.getArticles(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
        this.countPages = Math.ceil(this.countArticles / 10);
        // console.log(data);

        for (let i = 1; i <= this.countPages; i++) {
          this.pages.push(i);
        }
        if (this.pages.length === 1) {
          this.pages = [];
        }

      })

      this.getArticle.getTags().subscribe(data => {
        this.tags = data['tags'];
      })
    } else {
      this.getArticle.getArticleNoAuth(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
        this.countPages = Math.ceil(this.countArticles / 10);

        for (let i = 1; i <= this.countPages; i++) {
          this.pages.push(i);
        }

      })

      this.getArticle.getTagNoAuth().subscribe(data => {
        this.tags = data['tags'];
      })
    }

  }

  handlePagination(i) {
    this.getArticle.getArticles(i).subscribe(data => {
      this.listArticles = data['articles'];
    })
    this.currentIndex = i;
  }

  handleTag(tag) {
    if (!this.checkLoggedIn) {
      this.getArticle.getArticleNoAuth(this.offset, tag).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
        this.countPages = Math.ceil(this.countArticles / 10);
        this.pages = [];
        for (let i = 1; i <= this.countPages; i++) {
          this.pages.push(i);
        }
      })
      this.checkTabTag = true;
      this.nameTag = tag;
      this.global = false;
      this.checkYourFeed = false;
    } else {
      this.getArticle.getArticles(this.offset, tag).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
        this.countPages = Math.ceil(this.countArticles / 10);
        // console.log(this.pages, this.countPages);
        this.pages = [];
        for (let i = 1; i <= this.countPages; i++) {
          this.pages.push(i);
        }
        // console.log(data);

      })
      this.checkTabTag = true;
      this.nameTag = tag;
      this.global = false;
      this.checkYourFeed = false;
    }

  }

  handleGlobal() {
    if (!this.checkLoggedIn) {
      this.global = true;
      this.checkYourFeed = false;
      this.checkTabTag = false;
      this.getArticle.getArticleNoAuth(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
        this.countPages = Math.ceil(this.countArticles / 10);
        for (let i = 1; i <= this.countPages; i++) {
          this.pages.push(i);
        }
      })
    } else {
      this.global = true;
      this.checkYourFeed = false;
      this.checkTabTag = false;
      this.getArticle.getArticles(this.offset).subscribe(data => {
        this.listArticles = data['articles'];
        this.countArticles = data['articlesCount'];
        this.countPages = Math.ceil(this.countArticles / 10);
        for (let i = 1; i <= this.countPages; i++) {
          this.pages.push(i);
        }
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
      checkFavorite ? this.getArticle.unFavoriteArticle(slug).subscribe() : this.getArticle.favoriteArticle(slug).subscribe();
    }

  }


  handleYourFeed() {
    this.getArticle.getFeedArticle(this.token).subscribe(data => {
      this.checkYourFeed = true;
      this.global = false;
      this.listArticles = data['articles'];
      this.countArticles = data['articlesCount'];
      this.countPages = Math.ceil(this.countArticles / 10);
      for (let i = 1; i <= this.countPages; i++) {
        this.pages.push(i);
      }
    })
  }
}
