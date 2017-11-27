import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { AppRoutingModule } from './app-routing';
import { DataService } from '../services/data.service';
import {HttpModule} from '@angular/http';
import { MatchedTextPipe } from '../pipe/matched-text.pipe';
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  exports: [AppRoutingModule, HeaderComponent],
  declarations: [AutocompleteComponent, ContactsComponent, HeaderComponent, HomeComponent, MatchedTextPipe],
  providers: [DataService]
})
export class CoreModule { }
