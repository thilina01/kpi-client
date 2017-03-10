import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

import { GrowlModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    GrowlModule,
    routing,
  ],
  declarations: [Pages],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class PagesModule {
}
