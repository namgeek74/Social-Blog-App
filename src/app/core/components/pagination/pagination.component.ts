import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  // @Input('pages') pages: any;
  @Input('currentIndex') currentIndex: any;
  @Input('countArticles') countArticles: any;
  @Output("pageChange") pageChange: EventEmitter<any> = new EventEmitter();
  countPages: any;
  pages: any = [];

  constructor() { }

  ngOnInit() {
    this.createArrayPages();
  }

  ngOnChanges(changes) {
    this.createArrayPages();
  }

  onPageChange(index) {
    this.pageChange.emit(index);
  }

  createArrayPages() {
    this.countPages = Math.ceil(this.countArticles / 10);
    this.pages = [];
    for (let i = 1; i <= this.countPages; i++) {
      this.pages.push(i);
    }

    if (this.pages.length === 1) {
      this.pages = [];
    }
  }

}
