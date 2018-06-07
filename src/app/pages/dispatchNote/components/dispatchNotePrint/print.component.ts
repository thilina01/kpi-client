import { Component, Input } from "@angular/core";
import { DispatchNoteService } from "../../dispatchNote.service";
import { PrintService } from "../../../../services/print.service";
import { OrganizationService } from "../../../organization/organization.service";
import "rxjs/add/operator/take";

@Component({
  selector: "print",
  templateUrl: "./print.html"
})
export class Print {
  totalQuantity = 0.0;
  totalNumberOfPackages = 0.0;
  xAddress: any = null;
  xLoadingPlanItemList = [];

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          if (data === null) return;
          this.dispatchNote = data;
          this.totalQuantity = 0.0;
          this.totalNumberOfPackages = 0.0;
          this.xAddress = null;
          this.xLoadingPlanItemList = [];

          for (let i = 0; i < this.dispatchNote.loadingPlanList.length; i++) {
            let yLoadingPlan = this.dispatchNote.loadingPlanList[i];

            if (this.xAddress === null) {
              this.xAddress = yLoadingPlan.address;
            }
            let yLoadingPlanItemList = yLoadingPlan.loadingPlanItemList;

            for (let ii = 0; ii < yLoadingPlanItemList.length; ii++) {
              let xLoadingPlanItem = yLoadingPlanItemList[ii];

              xLoadingPlanItem.quantity = xLoadingPlanItem.quantity;
              this.totalQuantity += xLoadingPlanItem.quantity;

              xLoadingPlanItem.noOfpackages = Math.ceil(
                xLoadingPlanItem.quantity /
                  xLoadingPlanItem.packagingSpecification.perPalletQuantity
              );
              this.totalNumberOfPackages += xLoadingPlanItem.noOfpackages;

              this.xLoadingPlanItemList.push(xLoadingPlanItem);
            }
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
  dispatchNote: any;

  constructor(
    private service: DispatchNoteService,
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
