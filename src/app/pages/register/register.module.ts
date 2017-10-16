import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Register } from './register.component';
import { routing } from './register.routing';
import { UserService } from "../user/user.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Register
  ],
  providers: [
    UserService
  ]
})
export class RegisterModule { }
