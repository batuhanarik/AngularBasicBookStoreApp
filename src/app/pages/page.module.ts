import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

import {MaterialModule} from '../modules/material/material.module'

import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../components/header/header.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryNeweditComponent } from './admin-category-newedit/admin-category-newedit.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AdminBookNeweditComponent } from './admin-book-newedit/admin-book-newedit.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';



@NgModule({
  declarations: [HomeComponent,MainLayoutComponent,HeaderComponent,AdminLayoutComponent, AdminHomeComponent, AdminCategoryNeweditComponent, AdminCategoryListComponent, AdminBookNeweditComponent, AdminBookListComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
})
export class PageModule { }
