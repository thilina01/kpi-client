import { Routes, RouterModule }  from '@angular/router';

import { Item } from './item.component';
import { ItemForm } from './components/itemForm/itemForm.component';
import { ItemTable } from './components/itemTable/itemTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Item,
     children: [
      { path: 'form', component: ItemForm },
      { path: 'form/:id', component: ItemForm },
      { path: 'table', component: ItemTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
