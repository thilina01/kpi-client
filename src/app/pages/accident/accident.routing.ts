import { Routes, RouterModule } from '@angular/router';

import { Accident } from './accident.component';
import { AccidentForm } from './components/accidentForm/accidentForm.component';
import { AccidentTable } from './components/accidentTable/accidentTable.component';

const routes: Routes = [
  {
    path: '',
    component: Accident,
    children: [
      { path: 'form', component: AccidentForm },
      { path: 'form/:id', component: AccidentForm },
      { path: 'table', component: AccidentTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
