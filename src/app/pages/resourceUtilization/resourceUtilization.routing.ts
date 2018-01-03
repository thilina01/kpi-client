import { Routes, RouterModule } from '@angular/router';

import { ResourceUtilization } from './resourceUtilization.component';
import { ResourceUtilizationForm } from './components/resourceUtilizationForm/resourceUtilizationForm.component';
import { ResourceUtilizationTable } from './components/resourceUtilizationTable/resourceUtilizationTable.component';

const routes: Routes = [
  {
    path: '',
    component: ResourceUtilization,
    children: [
      { path: 'form', component: ResourceUtilizationForm },
      { path: 'form/:id', component: ResourceUtilizationForm },
      { path: 'table', component: ResourceUtilizationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
