import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {TapeCombobox} from "./tapecombobox";

@NgModule({
  declarations: [
    AppComponent,
    TapeCombobox
  ],
  imports: [HttpClientModule,
    BrowserModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
