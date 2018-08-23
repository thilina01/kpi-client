import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SubcontractNoteService } from '../../../subcontractNote/subcontractNote.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { LocationService } from '../../../location/location.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';
import { SubcontractReworkNoteService } from '../../../../services/subcontractReworkNote.service';

@Component({
  selector: 'subcontract-release-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractReleaseTable.scss'],
  templateUrl: './subcontractReleaseTable.html'
})
export class SubcontractReleaseTable {
  subcontractReworkReleaseTotalRecords: number;
  subcontractReworkReleaseRows = [];
  subcontractReworkNote = {};
  subcontractRelease = {};
  @ViewChild(DataTable)
  dataTable: DataTable;
  totalRecords: number;
  subcontractors: any;
  startDate: Date;
  locations: any;
  endDate: Date;
  pageSize = 20;
  timeout: any;
  rows = [];
  subcontractor: any = { id: 0, code: 'ALL', display: 'All Subcontractors' };
  location: any = { id: 0, code: 'ALL', display: 'All Locations' };

  constructor(
    protected service: SubcontractNoteService,
    private router: Router,
    private sharedService: SharedService,
    private locationService: LocationService,
    private confirmationService: ConfirmationService,
    private subcontractorService: SubcontractorService,
    private subcontractReworkNoteService: SubcontractReworkNoteService
  ) {
    this.loadData();
    this.getLocations();
    this.getSubcontractors();
    this.subcontractReworkReleaseLoadData();
  }

  getSubcontractors(): void {
    this.subcontractorService.getCombo().subscribe(subcontractors => {
      this.subcontractors = subcontractors;
      this.subcontractors.unshift({
        id: 0,
        code: 'ALL',
        display: 'All Subcontractors'
      });
    });
  }

  getLocations(): void {
    this.locationService.getCombo().subscribe(locations => {
      this.locations = locations;
      this.locations.unshift({ id: 0, code: 'ALL', display: 'All Locations' });
    });
  }

  subcontractReworkReleaseLoadData() {
    this.subcontractReworkNoteService
      .getSubcontractReworkRelease(0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.subcontractReworkReleaseFillTable(data);
      });
  }

  loadData() {
    this.service
      .getSubcontractRelease(0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSubcontractRelease(
        this.location !== undefined ? this.location.id : 0,
        this.subcontractor !== undefined ? this.subcontractor.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  subcontractReworkReleaseSearch(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.subcontractReworkNoteService
      .getSubcontractReworkRelease(
        this.location !== undefined ? this.location.id : 0,
        this.subcontractor !== undefined ? this.subcontractor.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.subcontractReworkReleaseFillTable(data);
      });
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  subcontractReworkReleaseFillTable(data: any) {
    this.subcontractReworkReleaseRows = data.content;
    this.subcontractReworkReleaseTotalRecords = data.totalElements;
  }

  lazy(event: any) {
    this.search(event.first / event.rows, event.rows);
    this.subcontractReworkReleaseSearch(
      event.first / event.subcontractReworkReleaseRows,
      event.subcontractReworkReleaseRows
    );
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/subcontractRelease/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({
            severity: 'info',
            summary: 'Deleted',
            detail: 'Delete success'
          });
          this.loadData();
        });
      }
    });
  }

  /*================== Subcontractor Filter ===================*/
  filteredSubcontractors: any[];
  filterSubcontractors(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractors = [];
    for (let i = 0; i < this.subcontractors.length; i++) {
      let subcontractor = this.subcontractors[i];
      if (subcontractor.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractors.push(subcontractor);
      }
    }
  }
  onSubcontractorSelect(subcontractor: any) {
    console.log(event);
    this.subcontractor = subcontractor;
  }
  /*================== Subcontractor Filter ===================*/
  /*================== Location Filter ===================*/
  filteredLocations: any[];
  filterLocations(event) {
    let query = event.query.toLowerCase();
    this.filteredLocations = [];
    for (let i = 0; i < this.locations.length; i++) {
      let location = this.locations[i];
      if (location.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredLocations.push(location);
      }
    }
  }
  onLocationSelect(location: any) {
    console.log(event);
    this.location = location;
  }
  /*================== End Of Location Filter ===================*/
}
