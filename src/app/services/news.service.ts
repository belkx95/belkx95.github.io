import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NEWSLIST } from '../mocks/mock-news';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { News } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsListRef: AngularFireList<any>;
  newsRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create News
  addNews(news: News) {
    this.newsListRef.push({
      title: news.title
    });
  }
  // Fetch Single News Object
  getNews(id: string) {
    this.newsRef = this.db.object('newslist/' + id);
    return this.newsRef;
  }
  // Fetch News List
  getNewsList() {
    this.newsListRef = this.db.list('newslist');
    return this.newsListRef;
  }
  // Update News Object
  updateNews(news: News) {
    this.newsRef.update({
      title: news.title,
    });
  }
  // Delete News Object
  deleteNews(id: string) {
    this.newsRef = this.db.object('newslist/' + id);
    this.newsRef.remove();
  }

}
