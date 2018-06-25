import { Routes, RouterModule } from '@angular/router';

import { SubcontractNote } from './subcontractNote.component';
import { SubcontractNoteForm } from './components/subcontractNoteForm/subcontractNoteForm.component';
import { SubcontractNoteTable } from './components/subcontractNoteTable/subcontractNoteTable.component';
import { SubcontractNotePrint } from './components/subcontractNotePrint/subcontractNotePrint.component';

const routes: Routes = [
  {
    path: '',
    component: SubcontractNote,
    children: [
      { path: 'form', component: SubcontractNoteForm },
      { path: 'form/:id', component: SubcontractNoteForm },
      { path: 'table', component: SubcontractNoteTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
