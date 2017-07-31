import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';

@Component({
  selector: 'productionKpi',
  styleUrls: ['./productionKpi.scss'],
  templateUrl: './productionKpi.html'
})
export class ProductionKpi {

  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
