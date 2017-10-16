import { Routes, RouterModule } from '@angular/router';

import { DispatchSchedule } from './dispatchSchedule.component';
import { DispatchScheduleForm } from './components/dispatchScheduleForm/dispatchScheduleForm.component';
import { DispatchScheduleTable } from './components/dispatchScheduleTable/dispatchScheduleTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: DispatchSchedule,
    children: [
      { path: 'form', component: DispatchScheduleForm },
      { path: 'form/:id', component: DispatchScheduleForm },
      { path: 'table', component: DispatchScheduleTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
