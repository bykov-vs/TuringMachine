import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {TapeComboboxComponent} from "./tape-combobox.component";
import { AlgTableComponent } from './components/alg-table/alg-table.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TapeComboboxComponent,
    AlgTableComponent,
    AlphabetComponent,
    SettingsComponent
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
