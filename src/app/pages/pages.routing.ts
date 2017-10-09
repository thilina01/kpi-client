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
      { path: 'addressType', canActivate: [AuthGuard], loadChildren: 'app/pages/addressType/addressType.module#AddressTypeModule' },
      { path: 'accident', canActivate: [AuthGuard], loadChildren: 'app/pages/accident/accident.module#AccidentModule' },
      { path: 'accidentType', canActivate: [AuthGuard], loadChildren: 'app/pages/accidentType/accidentType.module#AccidentTypeModule' },
      { path: 'application', canActivate: [AuthGuard], loadChildren: 'app/pages/application/application.module#ApplicationModule' },
      { path: 'breakdown', canActivate: [AuthGuard], loadChildren: 'app/pages/breakdown/breakdown.module#BreakdownModule' },
      { path: 'chart', canActivate: [AuthGuard], loadChildren: 'app/pages/chart/chart.module#ChartModule' },
      { path: 'computer', canActivate: [AuthGuard], loadChildren: 'app/pages/computer/computer.module#ComputerModule' },
      { path: 'computerType', canActivate: [AuthGuard], loadChildren: 'app/pages/computerType/computerType.module#ComputerTypeModule' },
      { path: 'controlPointType', canActivate: [AuthGuard], loadChildren: 'app/pages/controlPointType/controlPointType.module#ControlPointTypeModule' },
      { path: 'controlPointMachine', canActivate: [AuthGuard], loadChildren: 'app/pages/controlPointMachine/controlPointMachine.module#ControlPointMachineModule' },
      { path: 'controlPoint', canActivate: [AuthGuard], loadChildren: 'app/pages/controlPoint/controlPoint.module#ControlPointModule' },
      { path: 'containerSize', canActivate: [AuthGuard], loadChildren: 'app/pages/containerSize/containerSize.module#ContainerSizeModule' },
      { path: 'contactType', canActivate: [AuthGuard], loadChildren: 'app/pages/contactType/contactType.module#ContactTypeModule' },
      { path: 'costCenter', canActivate: [AuthGuard], loadChildren: 'app/pages/costCenter/costCenter.module#CostCenterModule' },
      { path: 'country', canActivate: [AuthGuard], loadChildren: 'app/pages/country/country.module#CountryModule' },
      { path: 'currency', canActivate: [AuthGuard], loadChildren: 'app/pages/currency/currency.module#CurrencyModule' },
      { path: 'customer', canActivate: [AuthGuard], loadChildren: 'app/pages/customer/customer.module#CustomerModule' },                
      { path: 'customerItem', canActivate: [AuthGuard], loadChildren: 'app/pages/customerItem/customerItem.module#CustomerItemModule' },
      { path: 'customerType', canActivate: [AuthGuard], loadChildren: 'app/pages/customerType/customerType.module#CustomerTypeModule' },                                                                 
      { path: 'cumulativeSalesPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/cumulativeSalesPerKg/cumulativeSalesPerKg.module#CumulativeSalesPerKgModule' },                                                                                                      
      { path: 'consumableCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/consumableCostPerKg/consumableCostPerKg.module#ConsumableCostPerKgModule' },                               
      { path: 'dashboard', canActivate: [AuthGuard], loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'department', canActivate: [AuthGuard], loadChildren: 'app/pages/department/department.module#DepartmentModule' },                       
      { path: 'deliveryTerm', canActivate: [AuthGuard], loadChildren: 'app/pages/deliveryTerm/deliveryTerm.module#DeliveryTermModule' },
      { path: 'dispatchNote', canActivate: [AuthGuard], loadChildren: 'app/pages/dispatchNote/dispatchNote.module#DispatchNoteModule' },
      { path: 'dispatchRelease', canActivate: [AuthGuard], loadChildren: 'app/pages/dispatchRelease/dispatchRelease.module#DispatchReleaseModule' },
      { path: 'dispatchSchedule', canActivate: [AuthGuard], loadChildren: 'app/pages/dispatchSchedule/dispatchSchedule.module#DispatchScheduleModule' },
      { path: 'energyConsumption', canActivate: [AuthGuard], loadChildren: 'app/pages/energyConsumption/energyConsumption.module#EnergyConsumptionModule' },                                                                                
      { path: 'electricityCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/electricityCostPerKg/electricityCostPerKg.module#ElectricityCostPerKgModule' }, 
      { path: 'employee', canActivate: [AuthGuard], loadChildren: 'app/pages/employee/employee.module#EmployeeModule' },                                 
      { path: 'financeSummary', canActivate: [AuthGuard], loadChildren: 'app/pages/financeSummary/financeSummary.module#FinanceSummaryModule' },                                 
      { path: 'financeKpi', canActivate: [AuthGuard], loadChildren: 'app/pages/financeKpi/financeKpi.module#FinanceKpiModule' },
      { path: 'home', canActivate: [AuthGuard], loadChildren: 'app/pages/home/home.module#HomeModule' },
      { path: 'humanResourceKpi', canActivate: [AuthGuard], loadChildren: 'app/pages/humanResourceKpi/humanResourceKpi.module#HumanResourceKpiModule' },
      { path: 'incoterm', canActivate: [AuthGuard], loadChildren: 'app/pages/incoterm/incoterm.module#IncotermModule' },
      { path: 'item', canActivate: [AuthGuard], loadChildren: 'app/pages/item/item.module#ItemModule' },
      { path: 'itemType', canActivate: [AuthGuard], loadChildren: 'app/pages/itemType/itemType.module#ItemTypeModule' },
      { path: 'job', canActivate: [AuthGuard], loadChildren: 'app/pages/job/job.module#JobModule' },
      { path: 'jobType', canActivate: [AuthGuard], loadChildren: 'app/pages/jobType/jobType.module#JobTypeModule' },                                                                                                                              
      { path: 'labourCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/labourCostPerKg/labourCostPerKg.module#LabourCostPerKgModule' },
      { path: 'labourSource', canActivate: [AuthGuard], loadChildren: 'app/pages/labourSource/labourSource.module#LabourSourceModule' },              
      { path: 'labourTurnover', canActivate: [AuthGuard], loadChildren: 'app/pages/labourTurnover/labourTurnover.module#LabourTurnoverModule' },
      { path: 'leaveType', canActivate: [AuthGuard], loadChildren: 'app/pages/leaveType/leaveType.module#LeaveTypeModule' },
      { path: 'location', canActivate: [AuthGuard], loadChildren: 'app/pages/location/location.module#LocationModule' },
      { path: 'lossReason', canActivate: [AuthGuard], loadChildren: 'app/pages/lossReason/lossReason.module#LossReasonModule' },
      { path: 'lossType', canActivate: [AuthGuard], loadChildren: 'app/pages/lossType/lossType.module#LossTypeModule' },                                                                                  
      { path: 'materialCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/materialCostPerKg/materialCostPerKg.module#MaterialCostPerKgModule' }, 
      { path: 'machine', canActivate: [AuthGuard], loadChildren: 'app/pages/machine/machine.module#MachineModule' },  
      { path: 'mailConfiguration', canActivate: [AuthGuard], loadChildren: 'app/pages/mailConfiguration/mailConfiguration.module#MailConfigurationModule' },  
      { path: 'manpower', canActivate: [AuthGuard], loadChildren: 'app/pages/manpower/manpower.module#ManpowerModule' },
      { path: 'manpowerType', canActivate: [AuthGuard], loadChildren: 'app/pages/manpowerType/manpowerType.module#ManpowerTypeModule' },
      { path: 'notifyParty', canActivate: [AuthGuard], loadChildren: 'app/pages/notifyParty/notifyParty.module#NotifyPartyModule' },
      { path: 'operation', canActivate: [AuthGuard], loadChildren: 'app/pages/operation/operation.module#OperationModule' },
      { path: 'organization', canActivate: [AuthGuard], loadChildren: 'app/pages/organization/organization.module#OrganizationModule' },
      { path: 'onTimeDelivery', canActivate: [AuthGuard], loadChildren: 'app/pages/onTimeDelivery/onTimeDelivery.module#OnTimeDeliveryModule' },
      { path: 'operationType', canActivate: [AuthGuard], loadChildren: 'app/pages/operationType/operationType.module#OperationTypeModule' },
      { path: 'paint', canActivate: [AuthGuard], loadChildren: 'app/pages/paint/paint.module#PaintModule' },
      { path: 'paymentTerm', canActivate: [AuthGuard], loadChildren: 'app/pages/paymentTerm/paymentTerm.module#PaymentTermModule' },
      { path: 'permission', canActivate: [AuthGuard], loadChildren: 'app/pages/permission/permission.module#PermissionModule' },
      { path: 'plan', canActivate: [AuthGuard], loadChildren: 'app/pages/plan/plan.module#PlanModule' },
      { path: 'production', canActivate: [AuthGuard], loadChildren: 'app/pages/production/production.module#ProductionModule' },
      { path: 'productionKpi', canActivate: [AuthGuard], loadChildren: 'app/pages/productionKpi/productionKpi.module#ProductionKpiModule' },
      { path: 'productionOverheadCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/productionOverheadCostPerKg/productionOverheadCostPerKg.module#ProductionOverheadCostPerKgModule' },
      { path: 'productType', canActivate: [AuthGuard], loadChildren: 'app/pages/productType/productType.module#ProductTypeModule' },      
      { path: 'salesKpi', canActivate: [AuthGuard], loadChildren: 'app/pages/salesKpi/salesKpi.module#SalesKpiModule' },
      { path: 'salesPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/salesPerKg/salesPerKg.module#SalesPerKgModule' }, 
      { path: 'salesOrder', canActivate: [AuthGuard], loadChildren: 'app/pages/salesOrder/salesOrder.module#SalesOrderModule' },
      { path: 'salesOrderType', canActivate: [AuthGuard], loadChildren: 'app/pages/salesOrderType/salesOrderType.module#SalesOrderTypeModule' },
      { path: 'salesValue', canActivate: [AuthGuard], loadChildren: 'app/pages/salesValue/salesValue.module#SalesValueModule' },     
      { path: 'salesWeight', canActivate: [AuthGuard], loadChildren: 'app/pages/salesWeight/salesWeight.module#SalesWeightModule' },
      { path: 'scrap', canActivate: [AuthGuard], loadChildren: 'app/pages/scrap/scrap.module#ScrapModule' },
      { path: 'scrapCostPerKg', canActivate: [AuthGuard], loadChildren: 'app/pages/scrapCostPerKg/scrapCostPerKg.module#ScrapCostPerKgModule' },
      { path: 'section', canActivate: [AuthGuard], loadChildren: 'app/pages/section/section.module#SectionModule' },
      { path: 'sectionType', canActivate: [AuthGuard], loadChildren: 'app/pages/sectionType/sectionType.module#SectionTypeModule' },
      { path: 'shift', canActivate: [AuthGuard], loadChildren: 'app/pages/shift/shift.module#ShiftModule' },
      { path: 'shiftType', canActivate: [AuthGuard], loadChildren: 'app/pages/shiftType/shiftType.module#ShiftTypeModule' },
      { path: 'supplier', canActivate: [AuthGuard], loadChildren: 'app/pages/supplier/supplier.module#SupplierModule' },
      { path: 'supplierType', canActivate: [AuthGuard], loadChildren: 'app/pages/supplierType/supplierType.module#SupplierTypeModule' },
      { path: 'team', canActivate: [AuthGuard], loadChildren: 'app/pages/team/team.module#TeamModule' },
      { path: 'test', canActivate: [AuthGuard], loadChildren: 'app/pages/test/test.module#TestModule' },
      { path: 'tool', canActivate: [AuthGuard], loadChildren: 'app/pages/tool/tool.module#ToolModule' },
      { path: 'toolBreakdown', canActivate: [AuthGuard], loadChildren: 'app/pages/toolBreakdown/toolBreakdown.module#ToolBreakdownModule' }, 
      { path: 'treatmentType', canActivate: [AuthGuard], loadChildren: 'app/pages/treatmentType/treatmentType.module#TreatmentTypeModule' }, 
      { path: 'user', canActivate: [AuthGuard], loadChildren: 'app/pages/user/user.module#UserModule' },
      { path: 'workCenter', canActivate: [AuthGuard], loadChildren: 'app/pages/workCenter/workCenter.module#WorkCenterModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
