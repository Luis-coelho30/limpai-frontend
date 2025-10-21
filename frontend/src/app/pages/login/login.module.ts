import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // ngClass
import { Login } from './login';

@NgModule({
  imports: [
    Login,
    BrowserModule,
    CommonModule
  ]
})
export class LoginModule {}
