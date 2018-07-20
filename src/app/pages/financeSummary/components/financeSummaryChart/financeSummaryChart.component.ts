import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../theme';

@Component({
  selector: 'financeSummaryChart',
  styleUrls: ['./financeSummaryChart.scss'],
  templateUrl: './financeSummaryChart.html'
})
export class FinanceSummaryChart {

  selectedTabIndex: number = 0;
  handleChange(e) {
    this.selectedTabIndex = e.index;
  }
  
  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
