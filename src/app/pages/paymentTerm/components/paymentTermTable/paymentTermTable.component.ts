import { PaymentTermService } from '../../../../services/paymentTerm.service';
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'payment-term-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./paymentTermTable.scss'],
  templateUrl: './paymentTermTable.html',
})

export class PaymentTermTable {
  rows = [];
  timeout: any;
  totalRecords: number;

  constructor(protected service: PaymentTermService, private router: Router, private confirmationService: ConfirmationService, private sharedService: SharedService) {
    this.loadData()
  }

  loadData() {
    this.service.getPage(0, 20).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }
  
  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;
    this.service.getPage((event.first / event.rows), event.rows).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/paymentTerm/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/paymentTerm/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).then(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          //this.msgs.push();
          this.loadData()
        }
        );
      }
    });
  }
}
