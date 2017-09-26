import { Routes, RouterModule }  from '@angular/router';

import { AccidentType } from './accidentType.component';
import { AccidentTypeForm } from './components/accidentTypeForm/accidentTypeForm.component';
import { AccidentTypeTable } from './components/accidentTypeTable/accidentTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AccidentType,
     children: [
      { path: 'form', component: AccidentTypeForm },
      { path: 'form/:id', component: AccidentTypeForm },
      { path: 'table', component: AccidentTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
