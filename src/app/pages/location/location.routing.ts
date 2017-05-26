import { Routes, RouterModule }  from '@angular/router';

import { Location } from './location.component';
import { LocationForm } from './components/locationForm/locationForm.component';
import { LocationTable } from './components/locationTable/locationTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Location,
     children: [
      { path: 'form', component: LocationForm },
      { path: 'form/:id', component: LocationForm },
      { path: 'table', component: LocationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
