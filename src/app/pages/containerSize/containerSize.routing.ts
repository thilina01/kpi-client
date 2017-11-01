import { Routes, RouterModule } from '@angular/router';

import { ContainerSize } from './containerSize.component';
import { ContainerSizeForm } from './components/containerSizeForm/containerSizeForm.component';
import { ContainerSizeTable } from './components/containerSizeTable/containerSizeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { ContainerSizeImport } from './components/containerSizeImport/containerSizeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerSize,
    children: [
      { path: 'form', component: ContainerSizeForm },
      { path: 'form/:id', component: ContainerSizeForm },
      { path: 'table', component: ContainerSizeTable },
      { path: 'import', component: ContainerSizeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
