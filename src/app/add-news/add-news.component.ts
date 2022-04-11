import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  public newsForm: FormGroup;

  constructor(
    public newsServive: NewsService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.newsServive.getNewsList();
    this.createForm();
  }

  createForm() {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  get title() {
    return this.newsForm.get('title');
  }
  

  ResetForm() {
    this.newsForm.reset();
  }

  submitNewsData() {
    this.newsServive.addNews(this.newsForm.value);
    this.toastr.success(
      this.newsForm.controls['title'].value + ' successfully added!'
    );
    this.ResetForm();
  }

}
