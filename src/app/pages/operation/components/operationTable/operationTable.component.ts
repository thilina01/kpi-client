import { OperationService } from '../../../../services/operation.service';
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { SectionService } from '../../../../services/section.service';
import { ShiftService } from '../../../../services/shift.service';
import { DataTable } from "primeng/components/datatable/datatable";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'operation-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationTable.scss'],
  templateUrl: './operationTable.html',
})

export class OperationTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;

  sections: any;
  section: any = { id: '', code: '', name: '' }
  shifts: any;
  shift: any = { id: '', code: '', name: '' }

  productionDate: Date;

  constructor(protected service: OperationService, private router: Router, private confirmationService: ConfirmationService, private sharedService: SharedService,
    private sectionService: SectionService, private shiftService: ShiftService) {
    this.loadData()
    this.getSections();
    this.getShifts();
  }
  getSections(): void {
    this.sectionService.getCombo().then(sections => this.sections = sections);
  }
  getShifts(): void {
    this.shiftService.getCombo().then(shifts => this.shifts = shifts);
  }
  loadData() {
    this.service.getPage(0, 20).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;

    console.log(this.section); // for demo purposes only    
    if (this.section != undefined && this.section.id != undefined && this.section.id != "") {
      //this.service.getPage((event.first / event.rows), event.rows).then((data: any) => {
      this.service.getBySectionAndProductionDateAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.productionDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }else{      
      this.service.getPage((event.first / event.rows), event.rows).then((data: any) => {
      //this.service.getBySectionAndProductionDateAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.productionDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  search(): void {

    //alert("Searching: "+ this.section.id+" / "+this.sharedService.YYYYMMDD(this.operationDate)+" / "+this.shift.id);
    /**/
    this.service.getBySectionAndProductionDateAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.productionDate), this.shift.id, 0, 20).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
      let paging = {
        first: (0),
        rows: this.dataTable.rows
      };
      // the problem is that if we set sorting, the table is
      // always going back to page 1, so we set a timer to go
      // back to the current page ...
      let timer = Observable.timer(100);
      timer.subscribe(t => {
        this.dataTable.paginate(paging);
      });
    });

  }
  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/operation/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/operation/form/' + id]);
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
