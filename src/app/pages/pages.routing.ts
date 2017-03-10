import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '../services/auth-guard.service';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate: [AuthGuard],
    children: [
      { path: '', canActivate: [AuthGuard], redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', canActivate: [AuthGuard], loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'plan', canActivate: [AuthGuard], loadChildren: 'app/pages/plan/plan.module#PlanModule' },
      { path: 'job', canActivate: [AuthGuard], loadChildren: 'app/pages/job/job.module#JobModule' },
      { path: 'item', canActivate: [AuthGuard], loadChildren: 'app/pages/item/item.module#ItemModule' },
      { path: 'production', canActivate: [AuthGuard], loadChildren: 'app/pages/production/production.module#ProductionModule' },
      { path: 'operation', canActivate: [AuthGuard], loadChildren: 'app/pages/operation/operation.module#OperationModule' },
      { path: 'manpower', canActivate: [AuthGuard], loadChildren: 'app/pages/manpower/manpower.module#ManpowerModule' },
      { path: 'components', canActivate: [AuthGuard], loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'charts', canActivate: [AuthGuard], loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'ui', canActivate: [AuthGuard], loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'forms', canActivate: [AuthGuard], loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', canActivate: [AuthGuard], loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'maps', canActivate: [AuthGuard], loadChildren: 'app/pages/maps/maps.module#MapsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
