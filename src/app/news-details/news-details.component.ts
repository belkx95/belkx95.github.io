import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from '../models/news.interface';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  news: News;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,) { }

    ngOnInit(): void {
      this.getNews();
    }
    
    getNews(): void {
      
      this.newsService.getNews(this.id).valueChanges()
          .subscribe(news => this.news = news);
    }

    goBack(): void {
      this.location.back();
    }

    deleteNews(id: string) {
      if (window.confirm('Are sure you want to delete this news ?')) { 
        this.newsService.deleteNews(this.id)
        this.toastr.success(this.news.title + ' successfully deleted!');
        this.router.navigate(['']);
      }
    }

}
