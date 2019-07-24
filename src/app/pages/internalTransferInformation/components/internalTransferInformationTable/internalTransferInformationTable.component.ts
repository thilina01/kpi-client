
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { JobService } from '../../../job/job.service';
import { InternalTransferInformationService } from '../../internalTransferInformation.service';
import { LocationService } from '../../../location/location.service';

@Component({
  selector: 'internal-transfer-information-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./internalTransferInformationTable.scss'],
  templateUrl: './internalTransferInformationTable.html',
})

export class InternalTransferInformationTable {
  filteredJobs: any[];
  jobs: any;
  rows = [];
  timeout: any;
  totalRecords: number;
  startDate: Date;
  endDate: Date;
  locations: any;
  location: any;
  pageSize = 20;
  @ViewChild(DataTable) dataTable: DataTable;
  job: any = { id: 0, 'code': 'ALL', 'display': 'All Jobs' };
  fromLocation: any = { id: 0, code: 'ALL', display: 'All Locations' };
  toLocation: any = { id: 0, code: 'ALL', display: 'All Locations' };
 
  constructor(protected service: InternalTransferInformationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private locationService: LocationService,
    private jobService: JobService,
    private sharedService: SharedService) {
    this.loadData();
    this.getJobs();
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getCombo().subscribe(locations => {
      this.locations = locations;
      this.locations.unshift({ id: 0, code: 'ALL', display: 'All Locations' });
    });
  }

  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({ id: 0, 'code': 'ALL', 'display': 'All Jobs' });
    });
  }

  lazy(event: any) {
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

  loadData() {
    this.service
      .getInternalTransferInformation(0, 0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

 search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getInternalTransferInformation(
        this.fromLocation !== undefined ? this.fromLocation.id : 0,
        this.toLocation !== undefined ? this.toLocation.id : 0,
        this.job !== undefined ? this.job.id : 0,
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
  /*================== Job Filter ===================*/
  filterJobs(event) {
    let query = event.query.toLowerCase();
    this.filteredJobs = [];
    for (let i = 0; i < this.jobs.length; i++) {
      let job = this.jobs[i];
      if (job.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredJobs.push(job);
      }
    }
  }

  onJobSelect(job: any) {
    console.log(event);
    this.job = job;

  }

  /*================== End Of Job Filter ===================*/
}






