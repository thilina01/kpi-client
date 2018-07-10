import { Routes, RouterModule } from '@angular/router';

import { InternalTransferNote } from './internalTransferNote.component';
import { InternalTransferNoteForm } from './components/internalTransferNoteForm/internalTransferNoteForm.component';
import { InternalTransferNoteTable } from './components/internalTransferNoteTable/internalTransferNoteTable.component';
import { InternalTransferNotePrint } from './components/internalTransferNotePrint/internalTransferNotePrint.component';

const routes: Routes = [
  {
    path: '',
    component: InternalTransferNote,
    children: [
      { path: 'form', component: InternalTransferNoteForm },
      { path: 'form/:id', component: InternalTransferNoteForm },
      { path: 'table', component: InternalTransferNoteTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
