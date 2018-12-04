import { Component, Input } from '@angular/core';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';
import { CreditNoteService } from '../creditNote/creditNote.service';

@Component({
  selector: 'credit-note-print',
  templateUrl: './print.html'
})
export class CreditNotePrint {
  amount = 0;
  totalAmount = 0.0;
  totalWeight = 0.0;
  address: any = null;
  customer: any = null;

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          if (data === null) return;
          this.creditNote = data;
          this.totalAmount = 0.0;
          this.totalWeight = 0.0;
          this.address = null;
          this.customer = null;

          for (let i = 0; i < this.creditNote.creditNoteItemList.length; i++) {
            let creditNoteItem = this.creditNote.creditNoteItemList[i];

            this.address = creditNoteItem.loadingPlanItem.loadingPlan.address;
            this.customer = creditNoteItem.loadingPlanItem.loadingPlan.customer;

            creditNoteItem.amount =
              creditNoteItem.quantity * creditNoteItem.unitPrice;
            this.totalAmount += creditNoteItem.amount;

            creditNoteItem.weight =
              creditNoteItem.quantity *
              creditNoteItem.loadingPlanItem.dispatchSchedule.job.item.weight;
            this.totalWeight += creditNoteItem.weight;
          }

          setTimeout(() => {
            let element = document.getElementById('creditNotePrint');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  creditNote: any;

  constructor(
    private service: CreditNoteService,
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
