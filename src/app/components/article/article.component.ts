import { Component, OnInit } from '@angular/core';
import { Article, Comment } from 'src/app/model/model';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  checkLoggedIn: boolean = localStorage.getItem('token') === null ? false : true;
  idSlug: string;
  singleArticle: Article;
  comment = new FormGroup({
    body: new FormControl('')
  });
  newCommment;
  renderComment: Comment[];
  isAuthor: boolean;
  renderFollow: string;
  renderFavorite: string;
  username: string = localStorage.getItem('username');

  constructor(
    private article: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.idSlug = data['slug'];
    })
    if (!this.checkLoggedIn) {
      this.article.getSingleArticleNoAuth(this.idSlug).subscribe(data => {
        this.singleArticle = data['article'];
        this.renderFollow = this.singleArticle.author.following ? 'UnFollow' : 'Follow';
        this.renderFavorite = this.singleArticle.favorited ? 'Unfavorite' : 'Favorite';
      })
    } else {
      this.article.getSingleArticle(this.idSlug).subscribe(data => {
        if (data['article'].author.username === this.username) {
          this.isAuthor = true;
        } else {
          this.isAuthor = false;
        }
        this.singleArticle = data['article'];
        this.renderFollow = this.singleArticle.author.following ? 'UnFollow' : 'Follow';
        this.renderFavorite = this.singleArticle.favorited ? 'Unfavorite' : 'Favorite';
      }, error => {
        this.router.navigate(['']);
      })
      this.article.getComment(this.idSlug).subscribe(data => {
        this.renderComment = data['comments'];
      }, error => {
        this.router.navigate(['']);
      })
    }


  }

  handleComment() {
    this.newCommment = {
      'comment': this.comment.value
    }
    this.article.postComment(this.idSlug, this.newCommment).subscribe(data => {
      this.renderComment.unshift(data['comment']);
      this.comment.controls.body.setValue('');

    });
  }

  handleDeleteComment(id, i) {
    this.renderComment = this.renderComment.filter((item, index) => {
      if (index !== i) {
        return item;
      }
      this.article.deleteComment(this.idSlug, id).subscribe();

    })
  }

  handleFollow(follow, userName) {
    if (!this.checkLoggedIn) {
      this.router.navigate(['/register']);
    } else {
      if (follow === false) {
        this.article.follow(userName).subscribe(data => {
          this.article.getSingleArticle(this.idSlug).subscribe(data => {
            if (data['article'].author.username === this.username) {
              this.isAuthor = true;
            } else {
              this.isAuthor = false;
            }
            this.singleArticle = data['article'];
            this.renderFollow = this.singleArticle.author.following ? 'UnFollow' : 'Follow';
          })
        })
      } else {
        this.article.unfollow(userName).subscribe(data => {
          this.article.getSingleArticle(this.idSlug).subscribe(data => {
            if (data['article'].author.username === this.username) {
              this.isAuthor = true;
            } else {
              this.isAuthor = false;
            }
            this.singleArticle = data['article'];
            this.renderFollow = this.singleArticle.author.following ? 'UnFollow' : 'Follow';
          })
        })
      }
    }

  }

  handleFavorite(checkFavorite) {
    if (!this.checkLoggedIn) {
      this.router.navigate(['/register']);
    } else {
      if (checkFavorite) {
        this.article.unFavoriteArticle(this.idSlug).subscribe(data => {
          this.singleArticle = data['article'];
          this.renderFavorite = this.singleArticle.favorited ? 'Unfavorite' : 'Favorite';
        })
      } else {
        this.article.favoriteArticle(this.idSlug).subscribe(data => {
          this.singleArticle = data['article'];
          this.renderFavorite = this.singleArticle.favorited ? 'Unfavorite' : 'Favorite';
        })
      }
    }

  }

  handleEditArticle() {
    this.router.navigate(['/editor', this.idSlug]);
  }

  handleDeleteArticle() {
    this.article.deleteArticle(this.idSlug).subscribe(data => {
      this.router.navigate(['']);
    })
  }
}
