import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TemplateDrivenAppComponent } from './template-driven-app/template-driven-app.component';
import { ReactiveDrivenAppComponent } from './reactive-driven-app/reactive-driven-app.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenAppComponent,
    ReactiveDrivenAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
