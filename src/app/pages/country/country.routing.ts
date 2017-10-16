import { Routes, RouterModule } from '@angular/router';

import { Country } from './country.component';
import { CountryForm } from './components/countryForm/countryForm.component';
import { CountryTable } from './components/countryTable/countryTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Country,
    children: [
      { path: 'form', component: CountryForm },
      { path: 'form/:id', component: CountryForm },
      { path: 'table', component: CountryTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
