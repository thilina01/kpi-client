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
  section: any = { id: 0, "code": "ALL", "name": "All Sections" }
  shifts: any;
  shift: any = { id: 0, "code": "ALL", "name": "All Shifts" }

  startDate: Date;
  endDate: Date;

  constructor(protected service: OperationService, private router: Router, private confirmationService: ConfirmationService, private sharedService: SharedService,
    private sectionService: SectionService, private shiftService: ShiftService) {
    this.loadData()
    this.getSections();
    this.getShifts();
  }
  getSections(): void {
    this.sectionService.getCombo().then(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, "code": "ALL", "name": "All Sections" });
    });
  }
  getShifts(): void {
    this.shiftService.getCombo().then(shifts => {
      this.shifts = shifts;
      this.shifts.unshift({ id: 0, "code": "ALL", "name": "All Shifts" });
    });
  }
  loadData() {
    this.service.getPage(0, 20).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any, table: any) {
    console.log(event);
    //const search = table.globalFilter ? table.globalFilter.value : null;
    this.search((event.first / event.rows), event.rows);
    // if (this.startDate != undefined && this.endDate != undefined && this.section != undefined && this.section.id != undefined) {
    //   if (this.section.id == 0) {
    //     this.service.getByProductionDurationAndShiftPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
    //       this.rows = data.content;
    //       this.totalRecords = data.totalElements;
    //     });
    //   } else {
    //     this.service.getBySectionAndProductionDurationAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
    //       this.rows = data.content;
    //       this.totalRecords = data.totalElements;
    //     });
    //   }
    // } else {
    //   this.service.getPage((event.first / event.rows), event.rows).then((data: any) => {
    //     //this.service.getBySectionAndProductionDateAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.productionDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
    //     this.rows = data.content;
    //     this.totalRecords = data.totalElements;
    //   });
    // }
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    if (this.startDate != undefined &&
      this.endDate != undefined &&
      this.section != undefined &&
      this.section.id != undefined &&
      this.shift != undefined &&
      this.shift.id != undefined) {
      //alert(this.section.id + " ~ " + this.shift.id);
      if (this.section.id == 0 && this.shift.id == 0) {
        this.service.getByProductionDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).then((data: any) => {
          this.fillTable(data);
        });
      } else if (this.section.id == 0 && this.shift.id > 0) {
        this.service.getByProductionDurationAndShiftPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).then((data: any) => {
          this.fillTable(data);
        });

      } else if (this.section.id > 0 && this.shift.id == 0) {
        this.service.getBySectionAndProductionDurationPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).then((data: any) => {
          this.fillTable(data);
        });
      } else {
        this.service.getBySectionAndProductionDurationAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).then((data: any) => {
          this.fillTable(data);
        });
      }
    }
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
    // let paging = {
    //   first: (0),
    //   rows: this.dataTable.rows
    // };
    // let timer = Observable.timer(100);
    // timer.subscribe(t => {
    //   this.dataTable.paginate(paging);
    // });
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
