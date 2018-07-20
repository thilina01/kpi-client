import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';

@Component({
  selector: 'engineeringKpi',
  styleUrls: ['./engineeringKpi.scss'],
  templateUrl: './engineeringKpi.html'
})
export class EngineeringKpi {

  selectedTabIndex: number = 0;
  handleChange(e) {
    this.selectedTabIndex = e.index;
  }
  
  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
