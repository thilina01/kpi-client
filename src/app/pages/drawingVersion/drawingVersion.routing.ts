import { Routes, RouterModule } from '@angular/router';

import { DrawingVersion } from './drawingVersion.component';
import { DrawingVersionForm } from './components/drawingVersionForm/drawingVersionForm.component';
import { DrawingVersionTable } from './components/drawingVersionTable/drawingVersionTable.component';

const routes: Routes = [
  {
    path: '',
    component: DrawingVersion,
    children: [
      { path: 'form', component: DrawingVersionForm },
      { path: 'form/:id', component: DrawingVersionForm },
      { path: 'table', component: DrawingVersionTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
