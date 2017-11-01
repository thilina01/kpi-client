import { Routes, RouterModule } from '@angular/router';

import { ContactType } from './contactType.component';
import { ContactTypeForm } from './components/contactTypeForm/contactTypeForm.component';
import { ContactTypeTable } from './components/contactTypeTable/contactTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { ContactTypeImport } from './components/contactTypeImport/contactTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactType,
    children: [
      { path: 'form', component: ContactTypeForm },
      { path: 'form/:id', component: ContactTypeForm },
      { path: 'table', component: ContactTypeTable },
      { path: 'import', component: ContactTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
