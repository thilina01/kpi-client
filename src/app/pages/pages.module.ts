import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { Pages } from './pages.component';

import { AuthGuard } from '../services/auth-guard.service';
import { MenuService } from '../services/menu.service';
import { UserMenuService } from '../services/userMenu.service';
import { UserService } from './user/user.service';
import { OrganizationService } from './organization/organization.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    GrowlModule,
    routing,
    AutoCompleteModule,
    FormsModule
  ],
  declarations: [Pages],
  providers: [
    AuthGuard,
    MenuService,
    UserService,
    OrganizationService,
    UserMenuService
  ]
})
export class PagesModule {
}
