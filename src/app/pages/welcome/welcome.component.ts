import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WelcomeService } from './welcome.service';
import { Pagination } from 'src/app/shared/model/pagination';
import { GithubResponse } from 'src/app/shared/model/githubResponse';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  validateForm: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  criteria: string;
  loading: boolean;

  previousValidateForm = {};
  pagination: Pagination = new Pagination(10);

  repoReponse: GithubResponse[] = [];
  reportingObject: any;

  constructor(
    private fb: FormBuilder,
    private welcomeService: WelcomeService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      searchCriteria: ['', [Validators.required]],
      language: [null],
      keyword: [null, [Validators.required]]
    });
    
    const reporting = localStorage.getItem('reporting');

    if (reporting === null) {
      const jsonObject = {
        items: [

        ]
      }
      localStorage.setItem('reporting', JSON.stringify(jsonObject));
      this.reportingObject = JSON.parse(localStorage.getItem('reporting'));
    } else {
      this.reportingObject = JSON.parse(reporting);
    }
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset({
      searchCriteria: '',
      language: null,
      keyword: ''
    });

    this.criteria = null;
  }

  criteriaChange(): void {
    this.criteria = this.validateForm.value.searchCriteria;
  }

  submitForm(resetPageNumber?: boolean): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {

      const formChanged = !this.isSamePreviousValidateForm();

      const language = this.validateForm.value.language;
      const keyword = this.validateForm.value.keyword;
      const searchCriteria = this.validateForm.value.searchCriteria;

      if (resetPageNumber && formChanged) {
        this.pagination.resetPageNumber();
      }

      this.loading = true;

      let query: string = '';
      if (searchCriteria === 'language') {
        query = `${keyword} language:${language}`
      } else {
        query = `topic:${keyword}`;
      }

      this.welcomeService.searchGithubRepo(this.pagination, query, language).subscribe(
        resp => {
          this.loading = false;
          this.pagination.total = resp.total_count;
          this.repoReponse = resp.items.map(element => new GithubResponse(element));

          const auditReport = {
            date: new Date().toLocaleString(),
            keyword: query,
            response: JSON.stringify(resp)
          }

          this.reportingObject.items.push(auditReport);
          console.log('reportingObject: ', this.reportingObject);

          localStorage.setItem('reporting', JSON.stringify(this.reportingObject));

        },
        error => {
          this.messageService.create('error','Failed to get response');
        }
      );
      
    }
  }

  isSamePreviousValidateForm(): boolean {
    const current = this.validateForm.getRawValue();
    const previous = this.previousValidateForm;
    return JSON.stringify(current) === JSON.stringify(previous);
  }

  goToUrl(url: string) {
    console.log('url: ', url);
    window.open(url, '_blank');
  }
}
