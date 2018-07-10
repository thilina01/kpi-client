import { Component, Input } from "@angular/core";
import { InternalTransferNoteService } from "../../internalTransferNote.service";
import { PrintService } from "../../../../services/print.service";
import { OrganizationService } from "../../../organization/organization.service";
import "rxjs/add/operator/take";

@Component({
  selector: "print",
  templateUrl: "./print.html"
})
export class Print {
  totalQuantity = 0.0;
  totalCost= 0.0;
  internalTransferItemList = [];

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          if (data === null) return;
          this.internalTransferNote = data;
          this.internalTransferItemList = [];
          this.totalQuantity = 0.0;
          this.totalCost = 0.0;


          for (let i = 0; i < this.internalTransferNote.internalTransferItemList.length; i++) {
            let internalTransferItem = this.internalTransferNote.internalTransferItemList[i];

            internalTransferItem.quantity = internalTransferItem.quantity;
            this.totalQuantity += internalTransferItem.quantity;

            // this.totalCost +=subcontractOperation.quantity * subcontractOperation.subcontractOperationRate.rate;

          }
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
  internalTransferNote: any;

  constructor(
    private service: InternalTransferNoteService,
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
