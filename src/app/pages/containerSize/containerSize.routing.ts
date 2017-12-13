import { Routes, RouterModule } from '@angular/router';

import { ContainerSize } from './containerSize.component';
import { ContainerSizeForm } from './components/containerSizeForm/containerSizeForm.component';
import { ContainerSizeTable } from './components/containerSizeTable/containerSizeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContainerSize,
    children: [
      { path: 'form', component: ContainerSizeForm },
      { path: 'form/:id', component: ContainerSizeForm },
      { path: 'table', component: ContainerSizeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
