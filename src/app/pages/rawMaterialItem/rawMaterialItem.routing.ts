import { Routes, RouterModule } from '@angular/router';

import { RawMaterialItem } from './rawMaterialItem.component';
import { RawMaterialItemForm } from './components/rawMaterialItemForm/rawMaterialItemForm.component';
import { RawMaterialItemTable } from './components/rawMaterialItemTable/rawMaterialItemTable.component';

const routes: Routes = [
  {
    path: '',
    component: RawMaterialItem,
    children: [
      { path: 'form', component: RawMaterialItemForm },
      { path: 'form/:id', component: RawMaterialItemForm },
      { path: 'table', component: RawMaterialItemTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
