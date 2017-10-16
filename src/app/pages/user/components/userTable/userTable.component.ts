
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'user-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./userTable.scss'],
  templateUrl: './userTable.html',
})

export class UserTable {
  rows = [];
  timeout: any;
  totalRecords: number;

  constructor(protected service: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService) {
    this.loadData()
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;
    this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
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
    this.router.navigate(['/pages/user/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/user/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          this.loadData()
        }
        );
      }
    });
  }
}
