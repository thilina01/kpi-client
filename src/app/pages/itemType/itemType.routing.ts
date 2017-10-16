import { Routes, RouterModule } from '@angular/router';

import { ItemType } from './itemType.component';
import { ItemTypeForm } from './components/itemTypeForm/itemTypeForm.component';
import { ItemTypeTable } from './components/itemTypeTable/itemTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ItemType,
    children: [
      { path: 'form', component: ItemTypeForm },
      { path: 'form/:id', component: ItemTypeForm },
      { path: 'table', component: ItemTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
