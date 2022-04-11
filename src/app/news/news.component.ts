import { Component, OnInit } from '@angular/core';
import { News } from '../models/news.interface';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  p: number = 1;
  hideWhenNoNews: boolean = true;
  noData: boolean = false;
  newsList: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.dataState();
    let s = this.newsService.getNewsList(); 
    s.snapshotChanges().subscribe(data => {
      this.newsList = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.newsList.push(a as News);
      })
    })
  }

  dataState() {     
    this.newsService.getNewsList().valueChanges().subscribe(data => {
      if(data.length <= 0){
        this.hideWhenNoNews = false;
        this.noData = true;
      } else {
        this.hideWhenNoNews = true;
        this.noData = false;
      }
    })
  }

}
