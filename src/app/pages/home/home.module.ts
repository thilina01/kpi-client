import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { Home } from './home.component';
import { routing } from './home.routing';

import { PanelModule } from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MaterialModule,
    PanelModule,
    routing
  ],
  declarations: [
    Home
  ],
  providers: [
  ]
})
export class HomeModule { }
