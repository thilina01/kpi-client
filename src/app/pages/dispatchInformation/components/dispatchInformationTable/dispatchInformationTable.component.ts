
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { DispatchInformationService } from '../../dispatchInformation.service';

@Component({
  selector: 'dispatch-information-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchInformationTable.scss'],
  templateUrl: './dispatchInformationTable.html',
})

export class DispatchInformationTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  constructor(protected service: DispatchInformationService,
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
    console.log(event);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

}



