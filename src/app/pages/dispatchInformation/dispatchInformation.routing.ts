import { Routes, RouterModule } from '@angular/router';

import { DispatchInformation } from './dispatchInformation.component';
import { DispatchInformationTable } from './components/dispatchInformationTable/dispatchInformationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: DispatchInformation,
    children: [
      { path: 'table', component: DispatchInformationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
