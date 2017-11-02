import { Routes, RouterModule } from '@angular/router';

import { Paint } from './paint.component';
import { PaintForm } from './components/paintForm/paintForm.component';
import { PaintTable } from './components/paintTable/paintTable.component';
import { ModuleWithProviders } from '@angular/core';
import { PaintImport } from './components/paintImport/paintImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Paint,
    children: [
      { path: 'form', component: PaintForm },
      { path: 'form/:id', component: PaintForm },
      { path: 'table', component: PaintTable },
      { path: 'import', component: PaintImport }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
