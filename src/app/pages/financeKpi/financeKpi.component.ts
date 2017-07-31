import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';

@Component({
  selector: 'financeKpi',
  styleUrls: ['./financeKpi.scss'],
  templateUrl: './financeKpi.html'
})
export class FinanceKpi {

  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
