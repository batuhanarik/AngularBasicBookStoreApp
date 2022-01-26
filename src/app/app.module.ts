import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PageModule } from './pages/page.module';
import { Router, RouterModule } from '@angular/router';






@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PageModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
