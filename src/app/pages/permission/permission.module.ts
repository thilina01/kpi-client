import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, CheckboxModule, AutoCompleteModule } from 'primeng/primeng';

import { Permission } from './permission.component';
import { PermissionTable } from './components/permissionTable/permissionTable.component';
import { PermissionForm } from './components/permissionForm/permissionForm.component';

import { MenuService } from '../../services/menu.service';
import { UserMenuService } from '../../services/userMenu.service';
import { routing } from './permission.routing';
import { StatusService } from '../../services/status.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';

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
    AutoCompleteModule,
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
    UserMenuService,
    StatusService,
    TeamService
  ]
})
export class PermissionModule { }
