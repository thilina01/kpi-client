import { Routes, RouterModule }  from '@angular/router';

import { NotifyParty } from './notifyParty.component';
import { NotifyPartyForm } from './components/notifyPartyForm/notifyPartyForm.component';
import { NotifyPartyTable } from './components/notifyPartyTable/notifyPartyTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: NotifyParty,
     children: [
      { path: 'form', component: NotifyPartyForm },
      { path: 'form/:id', component: NotifyPartyForm },
      { path: 'table', component: NotifyPartyTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
