import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrintService } from '../../../../services/print.service';
import { ConfirmationService, Message, MenuItem } from 'primeng/primeng';
import { InternalTransferNoteService } from '../../internalTransferNote.service';
import { LocationService } from '../../../location/location.service';

@Component({
  selector: 'internal-transfer-note-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./internalTransferNoteTable.scss'],
  templateUrl: './internalTransferNoteTable.html'
})
export class InternalTransferNoteTable {
  internalTransferNote = {};
  rows = [];
  timeout: any;
  internalTransferNoteId: number = 0;
  totalRecords: number;
  startDate: Date;
  endDate: Date;
  pageSize = 20;
  fromLocation: any = { id: 0, code: 'ALL', display: 'All Locations' };
  toLocation: any = { id: 0, code: 'ALL', display: 'All Locations' };
  locations: any;
  location: any;
  constructor(
    protected service: InternalTransferNoteService,
    private router: Router,
    private locationService: LocationService,
    private confirmationService: ConfirmationService,
    private printService: PrintService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getCombo().subscribe(locations => {
      this.locations = locations;
      this.locations.unshift({ id: 0, code: 'ALL', display: 'All Locations' });
    });
  }

  loadData() {
    this.service
      .getInternalTransferNote(0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getInternalTransferNote(
        this.fromLocation !== undefined ? this.fromLocation.id : 0,
        this.toLocation !== undefined ? this.toLocation.id : 0,
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

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {
    console.log(data);
  }

  print(id: number) {
    this.internalTransferNoteId = id;
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/internalTransferNote/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/internalTransferNote/form/' + id]);
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

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
