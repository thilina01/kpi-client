import { Component, Input } from '@angular/core';
import { LoadingPlanService } from '../../loadingPlan.service';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'loading-plan-print',
  templateUrl: './print.html'
})
export class LoadingPlanPrint {
  noOfpackages = 0.0;
  quantity = 0.0;
  weight=0.0;
  grossWeight=0.0;
  TotalGrossWeight= 0.0;
  totalWeight = 0.0;
  TotalnoOfPackages= 0.0;
  cubicMeter = 0.0;
  loadingPlanItemList = [];

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service.get(+id).take(1).subscribe(data => {
        if (data === null) return;
          this.loadingPlan = data;
          this.loadingPlanItemList = [];
          this.quantity = 0.0;
          this.cubicMeter = 0.0;
          this.totalWeight = 0.0;
          this.TotalnoOfPackages = 0.0;
          this.TotalGrossWeight = 0.0;

    for (let i = 0; i < this.loadingPlan.loadingPlanItemList.length; i++) {
        let loadingPlanItem = this.loadingPlan.loadingPlanItemList[i];

        this.quantity += parseInt(loadingPlanItem.quantity);
        this.cubicMeter += parseInt(loadingPlanItem.cubicMeter);

        loadingPlanItem.weight =loadingPlanItem.quantity * loadingPlanItem.dispatchSchedule.job.item.weight;
        this.totalWeight += loadingPlanItem.weight;

        loadingPlanItem.noOfpackages =loadingPlanItem.quantity / loadingPlanItem.packagingSpecification.perPalletQuantity;
        this.TotalnoOfPackages += loadingPlanItem.noOfpackages;

        loadingPlanItem.grossWeight =((loadingPlanItem.quantity )* (loadingPlanItem.dispatchSchedule.job.item.weight))+(((loadingPlanItem.quantity / loadingPlanItem.packagingSpecification.perPalletQuantity)*(loadingPlanItem.packagingSpecification.palletSize.weight)));
        this.TotalGrossWeight += loadingPlanItem.grossWeight;
    }
          setTimeout(() => {
            let element = document.getElementById('loading-plan-print');
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
