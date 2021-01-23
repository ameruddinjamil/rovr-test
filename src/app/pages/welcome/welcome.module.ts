import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { WelcomeService } from './welcome.service';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    WelcomeComponent
  ],
  providers: [
    WelcomeService, 
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
