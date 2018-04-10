import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../invoice.service';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'tax-invoice-print',
  templateUrl: './print.html'
})
export class TaxInvoicePrint {
  amount = 0;
  totalAmount = 0.0;
  totalWeight = 0.0;
  xAddress: any = null;
  xLoadingPlanItemList = [];
  xContainerSize: any = null;
  xNoOfContainers: number = null;

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service.get(+id).take(1).subscribe(data => {
        if (data === null) return;
          this.invoice = data;

          this.totalAmount = 0.0;
          this.totalWeight = 0.0;
          this.xContainerSize = null;
          this.xNoOfContainers = null;
          this.xLoadingPlanItemList = [];

          for (let i = 0; i < this.invoice.loadingPlanList.length; i++) {
            let yLoadingPlan = this.invoice.loadingPlanList[i];

            if (this.xNoOfContainers === null) {
              this.xNoOfContainers = yLoadingPlan.noOfContainers;
            }
            if (this.xContainerSize === null) {
              this.xContainerSize = yLoadingPlan.containerSize;
            }
            if (this.xAddress === null) {
              this.xAddress = yLoadingPlan.address;
            }

            let yLoadingPlanItemList = yLoadingPlan.loadingPlanItemList;
            for (let ii = 0; ii < yLoadingPlanItemList.length; ii++) {
              let xLoadingPlanItem = yLoadingPlanItemList[ii];
              xLoadingPlanItem.amount =
                xLoadingPlanItem.quantity *
                xLoadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
              this.totalAmount += xLoadingPlanItem.amount;
              xLoadingPlanItem.weight =xLoadingPlanItem.quantity *xLoadingPlanItem.dispatchSchedule.job.item.weight;
              this.totalWeight += xLoadingPlanItem.weight;
              this.xLoadingPlanItemList.push(xLoadingPlanItem);
            }
          }
          setTimeout(() => {
            let element = document.getElementById('taxInvoicePrint');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  invoice: any;

  constructor(
    private service: InvoiceService,
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
