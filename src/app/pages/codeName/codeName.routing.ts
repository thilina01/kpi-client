import { Routes, RouterModule } from '@angular/router';

import { CodeName } from './codeName.component';
import { CodeNameForm } from './components/codeNameForm/codeNameForm.component';
import { CodeNameTable } from './components/codeNameTable/codeNameTable.component';
import { CodeNameImport } from './components/codeNameImport/codeNameImport.component';

export const routes: Routes = [
  {
    path: '',
    component: CodeName,
    children: [
      { path: 'form', component: CodeNameForm },
      { path: 'form/:id', component: CodeNameForm },
      { path: 'table', component: CodeNameTable },
      { path: 'import', component: CodeNameImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
