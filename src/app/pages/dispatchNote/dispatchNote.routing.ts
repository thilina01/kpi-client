import { Routes, RouterModule } from '@angular/router';

import { DispatchNote } from './dispatchNote.component';
import { DispatchNoteForm } from './components/dispatchNoteForm/dispatchNoteForm.component';
import { DispatchNoteTable } from './components/dispatchNoteTable/dispatchNoteTable.component';
import { DispatchNotePrint } from './components/dispatchNotePrint/dispatchNotePrint.component';

const routes: Routes = [
  {
    path: '',
    component: DispatchNote,
    children: [
      { path: 'form', component: DispatchNoteForm },
      { path: 'form/:id', component: DispatchNoteForm },
      { path: 'table', component: DispatchNoteTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
