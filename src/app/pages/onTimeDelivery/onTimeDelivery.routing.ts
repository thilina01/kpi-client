import { Routes, RouterModule }  from '@angular/router';

import { OnTimeDelivery } from './onTimeDelivery.component';
import { OnTimeDeliveryForm } from './components/onTimeDeliveryForm/onTimeDeliveryForm.component';
import { OnTimeDeliveryTable } from './components/onTimeDeliveryTable/onTimeDeliveryTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OnTimeDelivery,
    children: [
      { path: 'form', component: OnTimeDeliveryForm },
      { path: 'form/:id', component: OnTimeDeliveryForm },
      { path: 'table', component: OnTimeDeliveryTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
