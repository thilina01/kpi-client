import { Routes, RouterModule } from '@angular/router';

import { Scrap } from './scrap.component';
import { ScrapForm } from './components/scrapForm/scrapForm.component';
import { ScrapTable } from './components/scrapTable/scrapTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Scrap,
    children: [
      { path: 'form', component: ScrapForm },
      { path: 'form/:id', component: ScrapForm },
      { path: 'table', component: ScrapTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
