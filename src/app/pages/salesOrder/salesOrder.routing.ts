import { Routes, RouterModule } from '@angular/router';

import { SalesOrder } from './salesOrder.component';
import { SalesOrderForm } from './components/salesOrderForm/salesOrderForm.component';
import { SalesOrderTable } from './components/salesOrderTable/salesOrderTable.component';
import { SalesOrderPrint } from './components/salesOrderPrint/salesOrderPrint.component';

const routes: Routes = [
  {
    path: '',
    component: SalesOrder,
    children: [
      { path: 'form', component: SalesOrderForm },
      { path: 'form/:id', component: SalesOrderForm },
      { path: 'table', component: SalesOrderTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
