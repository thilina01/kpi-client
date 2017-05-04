import { Routes, RouterModule }  from '@angular/router';

import { Section } from './section.component';
import { SectionForm } from './components/sectionForm/sectionForm.component';
import { SectionTable } from './components/sectionTable/sectionTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Section,
     children: [
      { path: 'form', component: SectionForm },
      { path: 'form/:id', component: SectionForm },
      { path: 'table', component: SectionTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
