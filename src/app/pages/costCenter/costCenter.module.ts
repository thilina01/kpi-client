import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { CostCenter } from './costCenter.component';
import { CostCenterService } from '../../services/costCenter.service';
import { CostCenterTable } from './components/costCenterTable/costCenterTable.component';
import { CostCenterForm } from './components/costCenterForm/costCenterForm.component';

import { routing } from './costCenter.routing';
import { SectionService } from "../../services/section.service";


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    routing
  ],
  declarations: [
    CostCenter,
    CostCenterTable,
    CostCenterForm
  ],
  providers: [
    CostCenterService,
    SectionService
    
  ]
})
export class CostCenterModule { }
