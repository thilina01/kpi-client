import { Routes, RouterModule } from '@angular/router';

import { Organization } from './organization.component';
import { OrganizationForm } from './components/organizationForm/organizationForm.component';
import { OrganizationTable } from './components/organizationTable/organizationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Organization,
    children: [
      { path: 'form', component: OrganizationForm },
      { path: 'form/:id', component: OrganizationForm },
      { path: 'table', component: OrganizationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
