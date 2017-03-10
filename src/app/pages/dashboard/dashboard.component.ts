import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
