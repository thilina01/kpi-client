import { Routes, RouterModule } from '@angular/router';

import { Country } from './country.component';
import { CountryForm } from './components/countryForm/countryForm.component';
import { CountryTable } from './components/countryTable/countryTable.component';
import { CountryImport } from './components/countryImport/countryImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Country,
    children: [
      { path: 'form', component: CountryForm },
      { path: 'form/:id', component: CountryForm },
      { path: 'table', component: CountryTable },
      { path: 'import', component: CountryImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
