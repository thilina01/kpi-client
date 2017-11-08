import { Routes, RouterModule } from '@angular/router';

import { Port } from './port.component';
import { PortForm } from './components/portForm/portForm.component';
import { PortTable } from './components/portTable/portTable.component';
import { ModuleWithProviders } from '@angular/core';
import { PortImport } from './components/portImport/portImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Port,
    children: [
      { path: 'form', component: PortForm },
      { path: 'form/:id', component: PortForm },
      { path: 'table', component: PortTable },
      { path: 'import', component: PortImport }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
