import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { PalletSize } from './palletSize.component';
import { LossTypeService } from '../../services/lossType.service';
import { PalletSizeTable } from './components/palletSizeTable/palletSizeTable.component';
import { PalletSizeForm } from './components/palletSizeForm/palletSizeForm.component';

import { routing } from './palletSize.routing';
import { PalletSizeService } from './palletSize.service';
import { ToolService } from '../tool/tool.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    PalletSize,
    PalletSizeTable,
    PalletSizeForm
  ],
  providers: [PalletSizeService, ToolService]
})
export class PalletSizeModule { }
