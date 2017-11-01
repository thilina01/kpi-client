import { Routes, RouterModule } from '@angular/router';

import { Incoterm } from './incoterm.component';
import { IncotermForm } from './components/incotermForm/incotermForm.component';
import { IncotermTable } from './components/incotermTable/incotermTable.component';
import { ModuleWithProviders } from '@angular/core';
import { IncotermImport } from './components/incotermImport/incotermImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Incoterm,
    children: [
      { path: 'form', component: IncotermForm },
      { path: 'form/:id', component: IncotermForm },
      { path: 'table', component: IncotermTable },
      { path: 'import', component: IncotermImport }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
