import { Component, OnInit } from '@angular/core';
import { Article, Profile } from 'src/app/model/model';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public message = "ID Profile not alive";
  checkLoggedIn: boolean = localStorage.getItem('token') === null ? false : true;
  account: Profile;
  url: 'https://static.productionready.io/images/smiley-cyrus.jpg';
  offset = 0;
  listArticles: Article[];
  countArticles;
  countPages;
  pages = [];
  currentIndex = 0;
  favorited: boolean;
  username: string;
  isAuthor: boolean;
  renderFollow: string;
  param: string;
  type: number;

  constructor(
    private profile: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(params => {
      this.param = params[1].path;
      if (params.length === 2) {
        if (!this.checkLoggedIn) {
          this.profile.getArticleNoAuth(this.param, this.offset).subscribe(data => {
            this.type = 1;
            this.favorited = false;
            this.listArticles = data['articles'];
            this.countArticles = data['articlesCount'];
            this.countPages = Math.ceil(this.countArticles / 5);
            for (let i = 1; i <= this.countPages; i++) {
              this.pages.push(i);
            }
            if (this.pages.length === 1) {
              this.pages = [];
            }
          })
        } else {
          this.profile.getArticles(this.param, this.offset).subscribe(data => {
            this.type = 1;
            this.favorited = false;
            this.listArticles = data['articles'];
            this.countArticles = data['articlesCount'];
            this.countPages = Math.ceil(this.countArticles / 5);
            for (let i = 1; i <= this.countPages; i++) {
              this.pages.push(i);
            }
            if (this.pages.length === 1) {
              this.pages = [];
            }
          }, error => {
            alert("Sai id profile");
            this.router.navigate(['']);
          })
        }

      } else {
        if (!this.checkLoggedIn) {
          this.profile.getFavoritedNoAuth(this.param, this.offset).subscribe(data => {
            this.type = 2;
            this.favorited = false;
            this.listArticles = data['articles'];
            this.countArticles = data['articlesCount'];
            this.countPages = Math.ceil(this.countArticles / 5);
            for (let i = 1; i <= this.countPages; i++) {
              this.pages.push(i);
            }
            if (this.pages.length === 1) {
              this.pages = [];
            }
          }, error => {
            this.router.navigate(['']);
          })
        } else {
          this.profile.getFavorited(this.param, this.offset).subscribe(data => {
            this.type = 2;
            this.favorited = false;
            this.listArticles = data['articles'];
            this.countArticles = data['articlesCount'];
            this.countPages = Math.ceil(this.countArticles / 5);
            for (let i = 1; i <= this.countPages; i++) {
              this.pages.push(i);
            }
            if (this.pages.length === 1) {
              this.pages = [];
            }
          }, error => {
            this.router.navigate(['']);
          })
        }

      }
    })
    this.route.paramMap.subscribe(data => {
      this.username = data.get('username');
    })
    if (this.username === localStorage.getItem('username')) {
      this.isAuthor = true;
    } else {
      this.isAuthor = false;
    }
    this.profile.getProfile(this.username).subscribe(data => {
      this.account = data['profile'];
      this.renderFollow = this.account.following ? 'UnFollow' : 'Follow';
    }, error => {
      // console.log(error);
      // console.log("-----------------------------");
      alert(this.message);
      this.router.navigate(['']);
    })
  }

  handlePagination(i) {
    this.profile.getArticles(this.username, i).subscribe(data => {
      this.listArticles = data['articles'];
    })
    this.currentIndex = i;
  }

  handleFavorites(type) {
    if (this.type == type) {
      return;
    }
    type === 1 ? this.router.navigate(['/profile', this.param]) : this.router.navigate(['/profile', this.param, 'favorites']);
  }

  handleFollow(follow) {
    if (!this.checkLoggedIn) {
      this.router.navigate(['/register']);
    } else {
      if (follow === false) {
        this.profile.follow(this.username).subscribe(data1 => {
          this.account = data1['profile'];
          this.renderFollow = this.account.following ? 'UnFollow' : 'Follow';
        })
      } else {
        this.profile.unfollow(this.username).subscribe(data1 => {
          this.account = data1['profile'];
          this.renderFollow = this.account.following ? 'UnFollow' : 'Follow';
        })
      }
    }

  }

  handleLike(slug, checkFavorite, i) {
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
      checkFavorite ? this.profile.unlike(slug).subscribe() : this.profile.like(slug).subscribe();
    }

  }
}
