import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule,CheckboxModule } from 'primeng/primeng';

import { Permission } from './permission.component';
import { PermissionTable } from './components/permissionTable/permissionTable.component';
import { PermissionForm } from './components/permissionForm/permissionForm.component';

import { MenuService } from '../../services/menu.service';
import { UserService } from '../../services/user.service';
import { UserMenuService } from '../../services/userMenu.service';

import { routing } from './permission.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CheckboxModule,
    routing
  ],
  declarations: [
    Permission,
    PermissionTable,
    PermissionForm
  ],
  providers: [
    MenuService,
    UserService,
    UserMenuService
  ]
})
export class PermissionModule { }
