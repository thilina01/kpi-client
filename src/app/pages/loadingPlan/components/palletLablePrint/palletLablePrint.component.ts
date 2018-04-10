import { Component, Input } from '@angular/core';
import { LoadingPlanService } from '../../loadingPlan.service';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'pallet-lable-print',
  templateUrl: './print.html'
})
export class PalletLablePrint {
  xDispatchSchedule: any = null;
  xPalletSize:any = null;
  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service.get(+id).take(1).subscribe(data => {
        if (data === null) return;
          this.loadingPlan = data;
          this.xDispatchSchedule = null;
          this.xPalletSize = null;

          for (let i = 0; i < this.loadingPlan.loadingPlanItemList.length; i++) {
            let loadingPlanItem = this.loadingPlan.loadingPlanItemList[i];

            if (this.xDispatchSchedule === null) {
              this.xDispatchSchedule = loadingPlanItem.dispatchSchedule;
            }

            if (this.xPalletSize === null) {
              this.xPalletSize = loadingPlanItem.palletSize;
            }
          }

          setTimeout(() => {
            let element = document.getElementById('pallet-lable-print');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  loadingPlan: any;

  constructor(
    private service: LoadingPlanService,
    private printService: PrintService,
    private organizationService: OrganizationService) {
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getAll().subscribe((data: any) => {
      this.organization = data[0];
    });
  }
}
