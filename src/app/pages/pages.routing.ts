import { Routes, RouterModule } from '@angular/router';
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
      { path: 'costCenter', canActivate: [AuthGuard], loadChildren: 'app/pages/costCenter/costCenter.module#CostCenterModule' },
      { path: 'country', canActivate: [AuthGuard], loadChildren: 'app/pages/country/country.module#CountryModule' },
      { path: 'currency', canActivate: [AuthGuard], loadChildren: 'app/pages/currency/currency.module#CurrencyModule' },
      { path: 'customer', canActivate: [AuthGuard], loadChildren: 'app/pages/customer/customer.module#CustomerModule' },
      { path: 'customerType', canActivate: [AuthGuard], loadChildren: 'app/pages/customerType/customerType.module#CustomerTypeModule' },                                                                 
      { path: 'cumulativeSalesPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/cumulativeSalesPerKg/cumulativeSalesPerKg.module#CumulativeSalesPerKgModule' },                                                                                                      
      { path: 'consumableCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/consumableCostPerKg/consumableCostPerKg.module#ConsumableCostPerKgModule' },                               
      { path: 'dashboard', canActivate: [AuthGuard], loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'energyConsumption', canActivate: [AuthGuard], loadChildren: 'app/pages/energyConsumption/energyConsumption.module#EnergyConsumptionModule' },                                                                                
      { path: 'electricityCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/electricityCostPerKg/electricityCostPerKg.module#ElectricityCostPerKgModule' },                                  
      { path: 'forms', canActivate: [AuthGuard], loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'home', canActivate: [AuthGuard], loadChildren: 'app/pages/home/home.module#HomeModule' },
      { path: 'incoterm', canActivate: [AuthGuard], loadChildren: 'app/pages/incoterm/incoterm.module#IncotermModule' },
      { path: 'item', canActivate: [AuthGuard], loadChildren: 'app/pages/item/item.module#ItemModule' },
      { path: 'itemType', canActivate: [AuthGuard], loadChildren: 'app/pages/itemType/itemType.module#ItemTypeModule' },
      { path: 'job', canActivate: [AuthGuard], loadChildren: 'app/pages/job/job.module#JobModule' },
      { path: 'jobType', canActivate: [AuthGuard], loadChildren: 'app/pages/jobType/jobType.module#JobTypeModule' },                                                                                                                              
      { path: 'labourCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/labourCostPerKg/labourCostPerKg.module#LabourCostPerKgModule' },
      { path: 'labourSource', canActivate: [AuthGuard], loadChildren: 'app/pages/labourSource/labourSource.module#LabourSourceModule' },              
      { path: 'labourTurnover', canActivate: [AuthGuard], loadChildren: 'app/pages/labourTurnover/labourTurnover.module#LabourTurnoverModule' },
      { path: 'location', canActivate: [AuthGuard], loadChildren: 'app/pages/location/location.module#LocationModule' },
      { path: 'lossReason ', canActivate: [AuthGuard], loadChildren: 'app/pages/lossReason/lossReason.module#LossReasonModule' },
      { path: 'lossType', canActivate: [AuthGuard], loadChildren: 'app/pages/lossType/lossType.module#LossTypeModule' },                                                                                  
      { path: 'materialCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/materialCostPerKg/materialCostPerKg.module#MaterialCostPerKgModule' }, 
      { path: 'machine', canActivate: [AuthGuard], loadChildren: 'app/pages/machine/machine.module#MachineModule' },  
      { path: 'manpower', canActivate: [AuthGuard], loadChildren: 'app/pages/manpower/manpower.module#ManpowerModule' },
      { path: 'manpowerType', canActivate: [AuthGuard], loadChildren: 'app/pages/manpowerType/manpowerType.module#ManpowerTypeModule' },
      { path: 'maps', canActivate: [AuthGuard], loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      { path: 'notifyParty', canActivate: [AuthGuard], loadChildren: 'app/pages/notifyParty/notifyParty.module#NotifyPartyModule' },
      { path: 'operation', canActivate: [AuthGuard], loadChildren: 'app/pages/operation/operation.module#OperationModule' },
      { path: 'operationType', canActivate: [AuthGuard], loadChildren: 'app/pages/operationType/operationType.module#OperationTypeModule' },
      { path: 'paint', canActivate: [AuthGuard], loadChildren: 'app/pages/paint/paint.module#PaintModule' },
      { path: 'paymentTerm', canActivate: [AuthGuard], loadChildren: 'app/pages/paymentTerm/paymentTerm.module#PaymentTermModule' },
      { path: 'permission', canActivate: [AuthGuard], loadChildren: 'app/pages/permission/permission.module#PermissionModule' },
      { path: 'plan', canActivate: [AuthGuard], loadChildren: 'app/pages/plan/plan.module#PlanModule' },
      { path: 'production', canActivate: [AuthGuard], loadChildren: 'app/pages/production/production.module#ProductionModule' },
      { path: 'productionOverheadCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/productionOverheadCostPerKg/productionOverheadCostPerKg.module#ProductionOverheadCostPerKgModule' },
      { path: 'salesPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/salesPerKg/salesPerKg.module#SalesPerKgModule' },
      { path: 'salesValue', canActivate: [AuthGuard], loadChildren: 'app/pages/salesValue/salesValue.module#SalesValueModule' },
      { path: 'salesWeight', canActivate: [AuthGuard], loadChildren: 'app/pages/salesWeight/salesWeight.module#SalesWeightModule' },
      { path: 'scrapCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/scrapCostPerKg/scrapCostPerKg.module#ScrapCostPerKgModule' },
      { path: 'section', canActivate: [AuthGuard], loadChildren: 'app/pages/section/section.module#SectionModule' },
      { path: 'shift', canActivate: [AuthGuard], loadChildren: 'app/pages/shift/shift.module#ShiftModule' },
      { path: 'shiftType', canActivate: [AuthGuard], loadChildren: 'app/pages/shiftType/shiftType.module#ShiftTypeModule' },
      { path: 'tables', canActivate: [AuthGuard], loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'test', canActivate: [AuthGuard], loadChildren: 'app/pages/test/test.module#TestModule' },
      { path: 'tool', canActivate: [AuthGuard], loadChildren: 'app/pages/tool/tool.module#ToolModule' },
      { path: 'toolBreakdown', canActivate: [AuthGuard], loadChildren: 'app/pages/toolBreakdown/toolBreakdown.module#ToolBreakdownModule' }, 
      { path: 'user', canActivate: [AuthGuard], loadChildren: 'app/pages/user/user.module#UserModule' },
      { path: 'workCenter', canActivate: [AuthGuard], loadChildren: 'app/pages/workCenter/workCenter.module#WorkCenterModule' },


    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
