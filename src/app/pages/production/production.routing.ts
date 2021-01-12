import { Routes, RouterModule }  from '@angular/router';

import { Production } from './production.component';
import { ProductionForm } from './components/productionForm/productionForm.component';
import { ProductionTable } from './components/productionTable/productionTable.component';
import {ProductionImport} from "./components/productionImport";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Production,
    children: [
      { path: 'form', component: ProductionForm },
      { path: 'form/:id', component: ProductionForm },
      { path: 'table', component: ProductionTable },
      { path: 'import', component: ProductionImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
