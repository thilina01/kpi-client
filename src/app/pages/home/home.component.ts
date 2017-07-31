import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home {
  bannerPath = '/assets/img/banner.png';
  salesIconPath = '/assets/img/sales.png';
  financeIconPath = '/assets/img/finance.png';
  productionIconPath = '/assets/img/production.png';
  engineeringIconPath = '/assets/img/engineering.png';
  humanResourceIconPath = '/assets/img/humanResource.png';

  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
