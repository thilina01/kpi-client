import { Routes, RouterModule } from '@angular/router';

import { PackingList } from './packingList.component';
import { PackingListForm } from './components/packingListForm/packingListForm.component';
import { PackingListTable } from './components/packingListTable/packingListTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PackingList,
    children: [
      { path: 'form', component: PackingListForm },
      { path: 'form/:id', component: PackingListForm },
      { path: 'table', component: PackingListTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
