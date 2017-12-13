import { Routes, RouterModule } from '@angular/router';

import { ItemType } from './itemType.component';
import { ItemTypeForm } from './components/itemTypeForm/itemTypeForm.component';
import { ItemTypeTable } from './components/itemTypeTable/itemTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { ItemTypeImport } from './components/itemTypeImport/itemTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: ItemType,
    children: [
      { path: 'form', component: ItemTypeForm },
      { path: 'form/:id', component: ItemTypeForm },
      { path: 'table', component: ItemTypeTable },
      { path: 'import', component: ItemTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
