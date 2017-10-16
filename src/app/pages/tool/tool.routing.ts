import { Routes, RouterModule } from '@angular/router';

import { Tool } from './tool.component';
import { ToolForm } from './components/toolForm/toolForm.component';
import { ToolTable } from './components/toolTable/toolTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Tool,
    children: [
      { path: 'form', component: ToolForm },
      { path: 'form/:id', component: ToolForm },
      { path: 'table', component: ToolTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
