import { Routes, RouterModule } from '@angular/router';

import { Chart } from './chart.component';
import { ModuleWithProviders } from '@angular/core';

import { ScheduleAdherenceChart } from './components/scheduleAdherenceChart/scheduleAdherenceChart.component';
import { BreakdownChart } from './components/breakdownChart/breakdownChart.component';
import { ScrapChart } from './components/scrapChart/scrapChart.component';
export const routes: Routes = [
  {
    path: '',
    component: Chart,
    children: [
      { path: 'scheduleAdherence', component: ScheduleAdherenceChart },
      { path: 'breakdown', component: BreakdownChart },
      { path: 'scrap', component: ScrapChart }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
