import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { AppRoutingModule } from './app-routing';
import { DataService } from '../services/data.service';
import {HttpModule} from '@angular/http';
import { MatchedTextPipe } from '../pipes/matched-text.pipe';

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
