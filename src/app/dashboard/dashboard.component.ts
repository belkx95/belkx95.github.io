import { Component, OnInit } from '@angular/core';
import { News } from '../models/news.interface';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  maxTop = 4;
  newsList: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList(): void {
    let s = this.newsService.getNewsList();
    s.snapshotChanges().subscribe(data => {
      this.newsList = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.newsList.push(a as News);
      })
    });
  }

}
