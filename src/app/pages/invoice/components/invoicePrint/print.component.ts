import { Component, Input } from '@angular/core';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import { InvoiceService } from '../../invoice.service';

@Component({
  selector: 'print',
  templateUrl: './print.html'
})
export class Print {

  @Input() set id(id: number) {
    if (this.id !== 0) {
      this.invoiceService.get(+id).subscribe(
        (invoice) => {
          this.invoice = invoice;              setTimeout(() => {
                let element = document.getElementById('print');
                if (element != null) {
                  this.printService.printA4(element.innerHTML);
                }
              }, 100);
          // this.dispatchScheduleService.getBySalesOrder(+id).subscribe(
          //   (dispatchScheduleList) => {
          //     this.dispatchScheduleList = dispatchScheduleList;

          //   }
          // );
        }
      );
    }
  }

  invoice: any;
  dispatchScheduleList: any;
  organization: any;

  constructor(
    private invoiceService: InvoiceService,
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

