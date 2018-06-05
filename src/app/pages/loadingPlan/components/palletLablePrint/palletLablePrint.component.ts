import { Component, Input } from "@angular/core";
import { LoadingPlanService } from "../../loadingPlan.service";
import { PrintService } from "../../../../services/print.service";
import { OrganizationService } from "../../../organization/organization.service";
import "rxjs/add/operator/take";

@Component({
  selector: "pallet-lable-print",
  templateUrl: "./print.html"
})
export class PalletLablePrint {
  pageCount = [];
  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          if (data === null) return;
          this.loadingPlan = data;
          for (
            let i = 0;
            i < this.loadingPlan.loadingPlanItemList.length;
            i++
          ) {
            let loadingPlanItem = this.loadingPlan.loadingPlanItemList[i];
            let pageList = [];
            let quantity = loadingPlanItem.quantity;
            let perPalletQuantity =
              loadingPlanItem.packagingSpecification.perPalletQuantity;

            while (quantity > 0) {
              let page: any = {};
              if (quantity > perPalletQuantity) {
                page.quantity = perPalletQuantity;
                quantity -= perPalletQuantity;
              } else {
                page.quantity = quantity;
                quantity = 0;
              }
              pageList.push(page);
            }
            loadingPlanItem.pageList = pageList;
          }
          console.log(this.loadingPlan);
          setTimeout(() => {
            let element = document.getElementById("pallet-lable-print");
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
