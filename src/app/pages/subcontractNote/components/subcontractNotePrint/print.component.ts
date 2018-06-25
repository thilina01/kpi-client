import { Component, Input } from "@angular/core";
import { SubcontractNoteService } from "../../subcontractNote.service";
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
  subcontractOperationList = [];

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          if (data === null) return;
          this.subcontractNote = data;
          this.subcontractOperationList = [];
          this.totalQuantity = 0.0;
          this.totalCost = 0.0;


          for (let i = 0; i < this.subcontractNote.subcontractOperationList.length; i++) {
            let subcontractOperation = this.subcontractNote.subcontractOperationList[i];

            subcontractOperation.quantity = subcontractOperation.quantity;
            this.totalQuantity += subcontractOperation.quantity;

            this.totalCost +=subcontractOperation.quantity * subcontractOperation.subcontractOperationRate.rate;

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
  subcontractNote: any;

  constructor(
    private service: SubcontractNoteService,
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
