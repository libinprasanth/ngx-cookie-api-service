import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NGXCookieAPIComponent } from './ngxcookie-api.component';
import { NGXCookieAPIService } from './ngxcookie-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [NGXCookieAPIComponent],
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
    HttpClientModule
  ],
  providers: [
    NGXCookieAPIService,
    {
      provide: 'req',
      useValue: null
    }
  ],
  exports: [NGXCookieAPIComponent]
})
export class NGXCookieAPIModule { }
