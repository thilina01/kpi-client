import { Routes, RouterModule } from '@angular/router';

import { SubcontractorOperation } from './subcontractorOperation.component';
import { SubcontractorOperationForm } from './components/subcontractorOperationForm/subcontractorOperationForm.component';
import { SubcontractorOperationTable } from './components/subcontractorOperationTable/subcontractorOperationTable.component';

const routes: Routes = [
  {
    path: '',
    component: SubcontractorOperation,
    children: [
      { path: 'form', component: SubcontractorOperationForm },
      { path: 'form/:id', component: SubcontractorOperationForm },
      { path: 'table', component: SubcontractorOperationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
