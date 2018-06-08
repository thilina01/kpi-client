import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../theme';

@Component({
  selector: 'financeSummaryChart',
  styleUrls: ['./financeSummaryChart.scss'],
  templateUrl: './financeSummaryChart.html'
})
export class FinanceSummaryChart {

  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
