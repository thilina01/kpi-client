import { Routes, RouterModule }  from '@angular/router';

import { Incoterm } from './incoterm.component';
import { IncotermForm } from './components/incotermForm/incotermForm.component';
import { IncotermTable } from './components/incotermTable/incotermTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Incoterm,
     children: [
      { path: 'form', component: IncotermForm },
      { path: 'form/:id', component: IncotermForm },
      { path: 'table', component: IncotermTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
