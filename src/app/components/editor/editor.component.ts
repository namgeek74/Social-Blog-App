import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tagList: new FormControl('')
  });
  newArticle;
  tagLists = [];
  slug: string;
  editTags: string[];
  submitted: boolean = false;

  constructor(private article: ArticleService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.submitted = true;
    this.activatedRouter.paramMap.subscribe(data1 => {
      this.slug = data1.get('slug');
      if (this.slug !== null) {
        this.article.getSingleArticle(this.slug).subscribe(data => {
          this.editTags = data['article'].tagList;
          this.articleForm.controls.title.setValue(data['article'].title);
          this.articleForm.controls.description.setValue(data['article'].description);
          this.articleForm.controls.body.setValue(data['article'].body);
        }, error => {
          this.router.navigate(['']);
        })
      }
    })
  }

  onSubmit() {
    this.submitted = true
    this.newArticle = {
      article: { ...this.articleForm.value, tagList: this.tagLists }
    }
    if (this.slug === null) {
      this.article.addArticle(this.newArticle).subscribe(data => {
        this.router.navigate(['article', data['article'].slug]);
      })
    } else {
      this.article.editArticle(this.slug, this.newArticle).subscribe(data => {
        this.router.navigate(['article', data['article'].slug]);
      })
    }

  }

  handleTag() {
    if (this.articleForm.value.tagList === '') {
      return;
    }
    this.tagLists.push(this.articleForm.value.tagList);
    this.articleForm.controls.tagList.setValue('');
  }
}
