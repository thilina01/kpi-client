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
      { path: 'absenteeism', canActivate: [AuthGuard], loadChildren: 'app/pages/absenteeism/absenteeism.module#AbsenteeismModule' },
      { path: 'breakdown', canActivate: [AuthGuard], loadChildren: 'app/pages/breakdown/breakdown.module#BreakdownModule' },
      { path: 'chart', canActivate: [AuthGuard], loadChildren: 'app/pages/chart/chart.module#ChartModule' },
      { path: 'charts', canActivate: [AuthGuard], loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'components', canActivate: [AuthGuard], loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'controlPointType', canActivate: [AuthGuard], loadChildren: 'app/pages/controlPointType/controlPointType.module#ControlPointTypeModule' },
      { path: 'controlPointMachine', canActivate: [AuthGuard], loadChildren: 'app/pages/controlPointMachine/controlPointMachine.module#ControlPointMachineModule' },
      { path: 'controlPoint', canActivate: [AuthGuard], loadChildren: 'app/pages/controlPoint/controlPoint.module#ControlPointModule' },
      { path: 'dashboard', canActivate: [AuthGuard], loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'energyConsumption', canActivate: [AuthGuard], loadChildren: 'app/pages/energyConsumption/energyConsumption.module#EnergyConsumptionModule' },
      { path: 'forms', canActivate: [AuthGuard], loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'item', canActivate: [AuthGuard], loadChildren: 'app/pages/item/item.module#ItemModule' },
      { path: 'job', canActivate: [AuthGuard], loadChildren: 'app/pages/job/job.module#JobModule' },
      { path: 'labourSource', canActivate: [AuthGuard], loadChildren: 'app/pages/labourSource/labourSource.module#LabourSourceModule' },
      { path: 'labourTurnover', canActivate: [AuthGuard], loadChildren: 'app/pages/labourTurnover/labourTurnover.module#LabourTurnoverModule' },
      { path: 'location', canActivate: [AuthGuard], loadChildren: 'app/pages/location/location.module#LocationModule' },
      { path: 'machine', canActivate: [AuthGuard], loadChildren: 'app/pages/machine/machine.module#MachineModule' },
      { path: 'manpower', canActivate: [AuthGuard], loadChildren: 'app/pages/manpower/manpower.module#ManpowerModule' },
      { path: 'maps', canActivate: [AuthGuard], loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      { path: 'operation', canActivate: [AuthGuard], loadChildren: 'app/pages/operation/operation.module#OperationModule' },
      { path: 'plan', canActivate: [AuthGuard], loadChildren: 'app/pages/plan/plan.module#PlanModule' },
      { path: 'production', canActivate: [AuthGuard], loadChildren: 'app/pages/production/production.module#ProductionModule' },
      { path: 'section', canActivate: [AuthGuard], loadChildren: 'app/pages/section/section.module#SectionModule' },
      { path: 'shift', canActivate: [AuthGuard], loadChildren: 'app/pages/shift/shift.module#ShiftModule' },
      { path: 'tables', canActivate: [AuthGuard], loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'tool', canActivate: [AuthGuard], loadChildren: 'app/pages/tool/tool.module#ToolModule' },
      { path: 'toolBreakdown', canActivate: [AuthGuard], loadChildren: 'app/pages/toolBreakdown/toolBreakdown.module#ToolBreakdownModule' },
      { path: 'ui', canActivate: [AuthGuard], loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'user', canActivate: [AuthGuard], loadChildren: 'app/pages/user/user.module#UserModule' },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
