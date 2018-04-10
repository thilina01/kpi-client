import { Component, Input } from '@angular/core';
import { LoadingPlanService } from '../../loadingPlan.service';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'dispatch-note-print',
  templateUrl: './print.html'
})
export class DispatchNotePrint {
  quantity = 0.0;
  totalQuantity= 0.0;
  loadingPlanItemList=[];
  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service.get(+id).take(1).subscribe(data => {
        if (data === null) return;
          this.loadingPlan = data;
          this.loadingPlanItemList = [];
          this.quantity = 0.0;
          this.totalQuantity = 0.0;
          for (let i = 0; i < this.loadingPlan.loadingPlanItemList.length; i++) {
            let loadingPlanItem = this.loadingPlan.loadingPlanItemList[i];

            loadingPlanItem.quantity =loadingPlanItem.quantity;
            this.totalQuantity += loadingPlanItem.quantity;
          }
          setTimeout(() => {
            let element = document.getElementById('dispatch-note-print');
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
