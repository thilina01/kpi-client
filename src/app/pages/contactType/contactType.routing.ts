import { Routes, RouterModule } from '@angular/router';

import { ContactType } from './contactType.component';
import { ContactTypeForm } from './components/contactTypeForm/contactTypeForm.component';
import { ContactTypeTable } from './components/contactTypeTable/contactTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContactType,
    children: [
      { path: 'form', component: ContactTypeForm },
      { path: 'form/:id', component: ContactTypeForm },
      { path: 'table', component: ContactTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
