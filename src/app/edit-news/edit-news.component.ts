import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private newsService: NewsService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.updateNewsData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.newsService
      .getNews(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }

  get title() {
    return this.editForm.get('title');
  }

  updateNewsData() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    this.newsService.updateNews(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['title'].value + ' updated successfully'
    );
    this.router.navigate(['']);
  }
}
