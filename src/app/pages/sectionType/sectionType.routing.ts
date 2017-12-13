import { Routes, RouterModule } from '@angular/router';

import { SectionType } from './sectionType.component';
import { SectionTypeForm } from './components/sectionTypeForm/sectionTypeForm.component';
import { SectionTypeTable } from './components/sectionTypeTable/sectionTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { SectionTypeImport } from './components/sectionTypeImport/sectionTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: SectionType,
    children: [
      { path: 'form', component: SectionTypeForm },
      { path: 'form/:id', component: SectionTypeForm },
      { path: 'table', component: SectionTypeTable },
      { path: 'import', component: SectionTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
