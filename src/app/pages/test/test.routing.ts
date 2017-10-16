import { Routes, RouterModule } from '@angular/router';

import { Test } from './test.component';
import { TestForm } from './components/testForm/testForm.component';
import { TestTable } from './components/testTable/testTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Test,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
