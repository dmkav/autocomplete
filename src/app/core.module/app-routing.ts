import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {HomeComponent} from '../home/home.component';
import {ContactsComponent} from '../contacts/contacts.component';


const routes: Routes = [
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
