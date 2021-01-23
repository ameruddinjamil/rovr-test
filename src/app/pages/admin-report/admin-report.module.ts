import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportRoutingModule } from './admin-report-routing.module';
import { AdminReportComponent } from './admin-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

@NgModule({
  declarations: [AdminReportComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  imports: [
    CommonModule,
    AdminReportRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminReportModule { }
