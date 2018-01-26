
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { DispatchReleaseService } from '../../dispatchRelease.service';
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { LocationService } from '../../../location/location.service';
import { CustomerService } from '../../../customer/customer.service';

@Component({
    selector: 'dispatch-release-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dispatchReleaseTable.scss'],
    templateUrl: './dispatchReleaseTable.html',
})
export class DispatchReleaseTable {

    dispatchRelease = {};
    rows = [];
    timeout: any;
    totalRecords: number;
    @ViewChild(DataTable) dataTable: DataTable;
    startDate: Date;
    endDate: Date;
    locations: any;
    customers: any;
    customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' }
    location: any = { id: 0, 'code': 'ALL', 'display': 'All Locations' }

    constructor(protected service: DispatchNoteService,
        private router: Router,
        private customerService: CustomerService,
        private locationService: LocationService,
        private confirmationService: ConfirmationService,
        private sharedService: SharedService) {
        this.loadData();
        this.getCustomers();
        this.getLocations();
    }
    getCustomers(): void {
        this.customerService.getCombo().subscribe(customers => {
            this.customers = customers;
            this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
        });
    }
    getLocations(): void {
        this.locationService.getCombo().subscribe(locations => {
            this.locations = locations;
            this.locations.unshift({ id: 0, 'code': 'ALL', 'display': 'All Locations' });
        });
    }
    loadData() {
        this.service.getPage(0, 20).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    lazy(event: any, table: any) {
        console.log(event);
        this.search((event.first / event.rows), event.rows);
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.search(event.first, event.rows);
        }, 100);
    }
    search(first: number, pageSize: number): void {
        if (this.startDate != undefined &&
            this.endDate != undefined &&
            this.customer != undefined &&
            this.customer.id != undefined &&
            this.location != undefined &&
            this.location.id != undefined) {
            if (this.customer.id == 0 && this.location.id == 0) {
                this.service.getByDispatchNoteDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else if (this.customer.id == 0 && this.location.id > 0) {
                this.service.getByDispatchNoteDurationAndLocationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.location.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.customer.id > 0 && this.location.id == 0) {
                this.service.getByCustomerAndDispatchNoteDurationPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else {
                this.service.getByCustomerAndDispatchNoteDurationAndLocationPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.location.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            }
        } else {
            this.service.getPage(first, pageSize).subscribe((data: any) => {
                this.fillTable(data);
            });
        }
    }

    fillTable(data: any) {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
    }

    selected(data: any) {
    }

    onRowDblclick(data: any): void {
        this.router.navigate(['/pages/dispatchRelease/form/' + data.id]);
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/dispatchRelease/form/' + id]);
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
    /*================== Customer Filter ===================*/
    filteredCustomers: any[];
    filterCustomers(event) {
        let query = event.query.toLowerCase();
        this.filteredCustomers = [];
        for (let i = 0; i < this.customers.length; i++) {
            let customer = this.customers[i];
            if (customer.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredCustomers.push(customer);
            }
        }
    }
    onCustomerSelect(customer: any) {
        console.log(event)
    }
    /*================== End Of Customer Filter ===================*/
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
        console.log(event)
    }
    /*================== End Of Location Filter ===================*/
}
