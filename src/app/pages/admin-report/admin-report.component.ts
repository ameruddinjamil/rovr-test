import { Component, OnInit } from '@angular/core';
import { AdminReportService } from './admin-report.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {

  loading: boolean;
  reportingObject: any;

  constructor(
    private adminReportService: AdminReportService
  ) { }

  ngOnInit() {
    this.reportingObject = JSON.parse(localStorage.getItem('reporting'));
  }

  download(jsonData: string) {
    this.adminReportService.downloadFile(jsonData);
  }

}
