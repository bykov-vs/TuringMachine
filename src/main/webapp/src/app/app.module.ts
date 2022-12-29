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
import { AboutDevsDialogComponent } from './components/about-devs-dialog/about-devs-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Routes, RouterModule } from '@angular/router';
import {
  AlphabetDownloadWindowComponent
} from "./components/alphabet-download-window/alphabet-download-window.component";
import {HttpService} from "./HttpService";
import {
  AlgorithmDownloadWindowComponent
} from "./components/algorithm-download-window/algorithm-download-window.component";
/*
const routes: Routes = [
  { path: 'about-system', component: AboutSystemComponent},
  { path: '', component:AppComponent}
];*/

@NgModule({
  declarations: [
    AppComponent,
    TapeComboboxComponent,
    AlgTableComponent,
    AlphabetComponent,
    SettingsComponent,
    AboutDevsDialogComponent,
    AlphabetDownloadWindowComponent,
    AlgorithmDownloadWindowComponent
  ],
  imports: [HttpClientModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    //RouterModule.forRoot(routes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
