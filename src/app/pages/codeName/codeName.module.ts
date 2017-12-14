import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgaModule} from '../../theme/nga.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  DataTableModule,
  SharedModule,
  PanelModule,
  InputTextModule,
  CalendarModule,
  FileUploadModule
} from 'primeng/primeng';

import {CodeName} from './codeName.component';

import {routing} from './codeName.routing';
import {CodeNameService} from './codeName.service';
import {CodeNameTable} from "./components/codeNameTable";
import {CodeNameForm} from "./components/codeNameForm";
import {CodeNameImport} from "./components/codeNameImport";

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
    CalendarModule,
    FileUploadModule,
    routing
  ],
  declarations: [
    CodeName,
    CodeNameTable,
    CodeNameForm,
    CodeNameImport
  ],
  providers: [
    CodeNameService
  ]
})
export class CodeNameModule {
}
