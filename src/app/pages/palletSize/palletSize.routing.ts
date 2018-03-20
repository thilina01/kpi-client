import { Routes, RouterModule } from '@angular/router';

import { PalletSize } from './palletSize.component';
import { PalletSizeForm } from './components/palletSizeForm/palletSizeForm.component';
import { PalletSizeTable } from './components/palletSizeTable/palletSizeTable.component';

const routes: Routes = [
  {
    path: '',
    component: PalletSize,
    children: [
      { path: 'form', component: PalletSizeForm },
      { path: 'form/:id', component: PalletSizeForm },
      { path: 'table', component: PalletSizeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
