import { Component, Input } from "@angular/core";
import { SalesOrderService } from "../../salesOrder.service";
import { PrintService } from "../../../../services/print.service";
import { OrganizationService } from "../../../organization/organization.service";
import "rxjs/add/operator/take";

@Component({
  selector: "print",
  templateUrl: "./print.html"
})
export class Print {

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          this.salesOrder = data;
          let salesOrderItemList = [];
          if (data === null){
            return;
          }
          for (let a = 0; a < this.salesOrder.salesOrderItemList.length; a++) {
            let salesOrderItem = this.salesOrder.salesOrderItemList[a];
            let invoiceList = [];
            let invoicedQuantity = 0;
            for (let b = 0; b < salesOrderItem.dispatchScheduleList.length; b++) {
              let dispatchSchedule = salesOrderItem.dispatchScheduleList[b];

              for (let c = 0; c < dispatchSchedule.loadingPlanItemList.length; c++) {
                let loadingPlanItem = dispatchSchedule.loadingPlanItemList[c];
                let xDispatchNote = loadingPlanItem.loadingPlan.dispatchNote;

                if (xDispatchNote === null ||  xDispatchNote.invoice === null){
                  continue;
                }

                let xInvoice = xDispatchNote.invoice;
                let found = false;
                for (let d = 0; d < invoiceList.length; d++) {
                  let invoice = invoiceList[d];
                  if (invoice.id === xInvoice.id){
                    invoice.quantity += loadingPlanItem.quantity;
                    invoicedQuantity += loadingPlanItem.quantity;
                    found = true;
                    break;
                  }
                }
                if (!found && xInvoice !== undefined){
                  xInvoice.quantity = loadingPlanItem.quantity;
                  invoicedQuantity += loadingPlanItem.quantity;
                  invoiceList.push(xInvoice);
                }
              }
            }
            salesOrderItem.invoiceList = invoiceList;
            salesOrderItem.invoicedQuantity = invoicedQuantity;
            salesOrderItemList.push(salesOrderItem);

          }
          this.salesOrder.salesOrderItemList = salesOrderItemList;
          setTimeout(() => {
            let element = document.getElementById("print");
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  salesOrder: any;

  constructor(
    private service: SalesOrderService,
    private printService: PrintService,
    private organizationService: OrganizationService
  ) {
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getAll().subscribe((data: any) => {
      this.organization = data[0];
    });
  }
}
