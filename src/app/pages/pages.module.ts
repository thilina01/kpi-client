import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import {AutoCompleteModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { Pages } from './pages.component';

import { AuthGuard } from '../services/auth-guard.service';
//import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { UserMenuService } from '../services/userMenu.service';

import { GrowlModule } from 'primeng/primeng';
import { UserService } from './user/user.service';

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
    //AuthService,
    MenuService,
    UserService,
    UserMenuService
  ]
})
export class PagesModule {
}
