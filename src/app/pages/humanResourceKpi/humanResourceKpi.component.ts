import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';

@Component({
  selector: 'humanResourceKpi',
  styleUrls: ['./humanResourceKpi.scss'],
  templateUrl: './humanResourceKpi.html'
})
export class HumanResourceKpi {

  selectedTabIndex: number = 0;
  handleChange(e) {
    this.selectedTabIndex = e.index;
  }
  
  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
