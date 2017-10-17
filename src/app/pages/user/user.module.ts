import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule } from 'primeng/primeng';

import { User } from './user.component';
import { UserTable } from './components/userTable/userTable.component';
import { UserForm } from './components/userForm/userForm.component';

import { routing } from './user.routing';
import { UserService } from './user.service';

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
    User,
    UserTable,
    UserForm
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
