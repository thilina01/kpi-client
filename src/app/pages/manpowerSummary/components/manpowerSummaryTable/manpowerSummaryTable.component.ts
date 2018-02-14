
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { SectionService } from '../../../section/section.service';
import { ManpowerSummaryService } from '../../manpowerSummary.service';
import { ShiftService } from '../../../shift/shift.service';
import { EmployeeService } from '../../../employee/employee.service';
import { ResourceUtilizationService } from '../../../resourceUtilization/resourceUtilization.service';
import { ChartService } from '../../../chart/chart.service';

@Component({
  selector: 'manpower-summary-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manpowerSummaryTable.scss'],
  templateUrl: './manpowerSummaryTable.html',
})

export class ManpowerSummaryTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  sections: any;
  section: any = { id: 0, 'code': 'ALL', 'display': 'All Sections' }
  startDate: Date = new Date();
  endDate: Date = new Date();
  total = 0;
  constructor(protected service: ResourceUtilizationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private chartService: ChartService,
    private sharedService: SharedService,
    private sectionService: SectionService,
    private shiftService: ShiftService) {
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(24, 0, 0, 0);
    this.getSections();
    this.search();
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, 'code': 'ALL', 'display': 'All Sections' });
    });
  }

  search(): void {
    if (this.startDate != undefined &&
      this.endDate != undefined &&
      this.section != undefined &&
      this.section.id != undefined) {
      if (this.section.id == 0) {
        this.chartService.getManpowerSummary(this.startDate.getTime(), this.endDate.getTime()).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.section.id > 0) {
        this.chartService.getManpowerSummaryBySection(this.startDate.getTime(), this.endDate.getTime(), this.section.id).subscribe((data: any) => {
          this.fillTable(data);
        });
      }
    } else {
    }
  }

  fillTable(data: any) {
    let jsonData = data.json();
    this.total = 0;
    jsonData.forEach(element => {
      element.controlPointCode = element.controlPoint.code;
      this.total += element.count;
    });
    this.rows = jsonData;
  }

  /*================== Section Filter ===================*/
  filteredSections: any[];
  filterSections(event) {
    let query = event.query.toLowerCase();
    this.filteredSections = [];
    for (let i = 0; i < this.sections.length; i++) {
      let section = this.sections[i];
      if (section.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSections.push(section);
      }
    }
  }
  onSectionSelect(section: any) {
    console.log(event);
  }
  /*================== End Of Section Filter ===================*/

}



