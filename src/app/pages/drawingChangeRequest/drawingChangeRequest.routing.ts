import { Routes, RouterModule } from '@angular/router';

import { DrawingChangeRequest } from './drawingChangeRequest.component';
import { DrawingChangeRequestForm } from './components/drawingChangeRequestForm/drawingChangeRequestForm.component';
import { DrawingChangeRequestTable } from './components/drawingChangeRequestTable/drawingChangeRequestTable.component';

const routes: Routes = [
  {
    path: '',
    component: DrawingChangeRequest,
    children: [
      { path: 'form', component: DrawingChangeRequestForm },
      { path: 'form/:id', component: DrawingChangeRequestForm },
      { path: 'table', component: DrawingChangeRequestTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
