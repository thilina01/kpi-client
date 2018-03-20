import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { PackagingSpecification } from './packagingSpecification.component';
import { LossTypeService } from '../../services/lossType.service';
import { PackagingSpecificationTable } from './components/packagingSpecificationTable/packagingSpecificationTable.component';
import { PackagingSpecificationForm } from './components/packagingSpecificationForm/packagingSpecificationForm.component';

import { routing } from './packagingSpecification.routing';
import { PackagingSpecificationService } from './packagingSpecification.service';
import { ToolService } from '../tool/tool.service';
import { PalletSizeService } from '../palletSize/palletSize.service';
import { ItemService } from '../item/item.service';

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
    PackagingSpecification,
    PackagingSpecificationTable,
    PackagingSpecificationForm
  ],
  providers:
  [
    PackagingSpecificationService,
    PalletSizeService,
    ItemService
  ]
})
export class PackagingSpecificationModule { }
