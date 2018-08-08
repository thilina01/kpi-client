import { Component, Input } from "@angular/core";
import { InvoiceService } from "../../invoice.service";
import { PrintService } from "../../../../services/print.service";
import { OrganizationService } from "../../../organization/organization.service";
import "rxjs/add/operator/take";

@Component({
  selector: "commercial-invoice-print",
  templateUrl: "./print.html"
})
export class CommercialInvoicePrint {
  amount = 0;
  totalAmount = 0.0;
  totalWeight = 0.0;
  xAddress: any = null;
  xLoadingPlanItemList = [];
  xContainerSize: any = null;
  xNoOfContainers: number = null;
  Math: any;

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
        this.xAddress = null;
        this.xLoadingPlanItemList = [];


        for (let i = 0; i < this.invoice.dispatchNoteList.length; i++) {
          let dispatchNote = this.invoice.dispatchNoteList[i];
          if (dispatchNote === undefined) return;
          let xLoadingPlanList = dispatchNote.loadingPlanList;

          for (let ii = 0; ii < xLoadingPlanList.length; ii++) {
            let xLoadingPlan = xLoadingPlanList[ii];

            if (this.xAddress === null) {
                   this.xAddress = xLoadingPlan.address;
                 }
          }

        }


        for (let i = 0; i < this.invoice.dispatchNoteList.length; i++) {
          let yLoadingPlan = this.invoice.dispatchNoteList[i].loadingPlanList[i];
          if (yLoadingPlan !== undefined) {
            if (this.xNoOfContainers === null) {
              this.xNoOfContainers = yLoadingPlan.noOfContainers;
            }
            if (this.xContainerSize === null) {
              this.xContainerSize = yLoadingPlan.containerSize;
            }
            // if (this.xAddress === null) {
            //   this.xAddress = yLoadingPlan.address;
            // }
          }
        }

        for (let i = 0; i < this.invoice.dispatchNoteList.length; i++) {
          let yLoadingPlanList = this.invoice.dispatchNoteList[i].loadingPlanList;
          let xLoadingPlan = yLoadingPlanList[i];
          if (xLoadingPlan !== undefined) {
          for (let ii = 0; ii < yLoadingPlanList.length; ii++) {
            let xLoadingPlanItemList = yLoadingPlanList[ii].loadingPlanItemList;

            for (let iii = 0; iii < xLoadingPlanItemList.length; iii++) {
              let xLoadingPlanItem = xLoadingPlanItemList[iii];
              if (xLoadingPlanItem !== undefined) {
                if (xLoadingPlanItem.unitPrice === null || xLoadingPlanItem.unitPrice === undefined){
                  xLoadingPlanItem.unitPrice = xLoadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
                }
                xLoadingPlanItem.amount = xLoadingPlanItem.invoiceQuantity * xLoadingPlanItem.unitPrice;
                this.totalAmount += xLoadingPlanItem.amount;
                xLoadingPlanItem.weight = xLoadingPlanItem.invoiceQuantity * xLoadingPlanItem.dispatchSchedule.job.item.weight;
                this.totalWeight += xLoadingPlanItem.weight;
                this.xLoadingPlanItemList.push(xLoadingPlanItem);
              }
            }
          }
        }
      }
      setTimeout(() => {
          let element = document.getElementById("commercialInvoicePrint");
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
    private organizationService: OrganizationService
  ) {
    this.getOrganization();
    this.Math = Math;
  }

  getOrganization() {
    this.organizationService.getAll().subscribe((data: any) => {
      this.organization = data[0];
    });
  }
}
