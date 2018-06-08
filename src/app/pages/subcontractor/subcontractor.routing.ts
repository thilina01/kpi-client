import { Routes, RouterModule } from '@angular/router';

import { Subcontractor } from './subcontractor.component';
import { SubcontractorForm } from './components/subcontractorForm/subcontractorForm.component';
import { SubcontractorTable } from './components/subcontractorTable/subcontractorTable.component';

const routes: Routes = [
  {
    path: '',
    component: Subcontractor,
    children: [
      { path: 'form', component: SubcontractorForm },
      { path: 'form/:id', component: SubcontractorForm },
      { path: 'table', component: SubcontractorTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
