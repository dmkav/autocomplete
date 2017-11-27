import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutocompleteComponent} from '../components/autocomplete/autocomplete.component';
import {HomeComponent} from '../components/home/home.component';
import {ContactsComponent} from '../components/contacts/contacts.component';


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
