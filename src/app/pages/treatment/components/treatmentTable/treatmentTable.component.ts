
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { SectionService } from '../../../section/section.service';
import { TreatmentService } from '../../treatment.service';
import { ShiftService } from '../../../shift/shift.service';
import { AccidentService } from '../../../accident/accident.service';

@Component({
  selector: 'treatment-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./treatmentTable.scss'],
  templateUrl: './treatmentTable.html',
})

export class TreatmentTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  display: boolean = false;

  constructor(protected service: TreatmentService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private sectionService: SectionService,
    private accidentService: AccidentService,
    private shiftService: ShiftService) {
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
      console.log('paged!', event);
    }, 100);
  }
  navigateToForm(id: any): void {
    this.router.navigate(['/pages/accident/form/']);
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onRowDblclick(data: any): void {
    this.showDialog();
  }

  showDialog() {
    this.display = true;
  }

}