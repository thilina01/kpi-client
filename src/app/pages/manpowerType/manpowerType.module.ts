import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { ManpowerType } from './manpowerType.component';
import { ManpowerTypeService } from '../../services/manpowerType.service';
import { ManpowerTypeTable } from './components/manpowerTypeTable/manpowerTypeTable.component';
import { ManpowerTypeForm } from './components/manpowerTypeForm/manpowerTypeForm.component';

import { routing } from './manpowerType.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
     InputTextModule,
    routing
  ],
  declarations: [
    ManpowerType,
    ManpowerTypeTable,
    ManpowerTypeForm
  ],
  providers: [
    ManpowerTypeService
  ]
})
export class ManpowerTypeModule { }
