import { Routes, RouterModule } from '@angular/router';

import { ToolBreakdown } from './toolBreakdown.component';
import { ToolBreakdownForm } from './components/toolBreakdownForm/toolBreakdownForm.component';
import { ToolBreakdownTable } from './components/toolBreakdownTable/toolBreakdownTable.component';

const routes: Routes = [
  {
    path: '',
    component: ToolBreakdown,
    children: [
      { path: 'form', component: ToolBreakdownForm },
      { path: 'form/:id', component: ToolBreakdownForm },
      { path: 'table', component: ToolBreakdownTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
