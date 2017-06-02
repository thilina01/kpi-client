import { Routes, RouterModule }  from '@angular/router';

import { Absenteeism } from './absenteeism.component';
import { AbsenteeismForm } from './components/absenteeismForm/absenteeismForm.component';
import { AbsenteeismTable } from './components/absenteeismTable/absenteeismTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Absenteeism,
    children: [
      { path: 'form', component: AbsenteeismForm },
      { path: 'form/:id', component: AbsenteeismForm },
      { path: 'table', component: AbsenteeismTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
