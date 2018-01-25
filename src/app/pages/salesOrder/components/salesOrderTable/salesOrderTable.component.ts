
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SalesOrderService } from '../../salesOrder.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { CustomerService } from '../../../customer/customer.service';
import { SalesOrderTypeService } from '../../../salesOrderType/salesOrderType.service';

@Component({
    selector: 'sales-order-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesOrderTable.scss'],
    templateUrl: './salesOrderTable.html',
})
export class SalesOrderTable {
    salesOrder = {};
    rows = [];
    timeout: any;
    salesOrderTypes: any;
    customers: any;
    totalRecords: number;
    @ViewChild(DataTable) dataTable: DataTable;
    salesOrderType: any = { id: 0, 'code': 'ALL', 'display': 'All SalesOrderTypes' }
    customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' }
    startDate: Date;
    endDate: Date;
    constructor(protected service: SalesOrderService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private salesOrderTypeService: SalesOrderTypeService,
        private customerService: CustomerService,
        private sharedService: SharedService) {
        this.loadData();
        this.getCustomers();
        this.getSalesOrderTypes();
    }

    getCustomers(): void {
        this.customerService.getCombo().subscribe(customers => {
            this.customers = customers;
            this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
        });
    }
    getSalesOrderTypes(): void {
        this.salesOrderTypeService.getCombo().subscribe(salesOrderTypes => {
            this.salesOrderTypes = salesOrderTypes;
            this.salesOrderTypes.unsalesOrderType({ id: 0, 'code': 'ALL', 'display': 'All SalesOrderTypes' });
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
            this.salesOrderType != undefined &&
            this.salesOrderType.id != undefined) {
            if (this.customer.id == 0 && this.salesOrderType.id == 0) {
                this.service.getBySalesOrderDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else if (this.customer.id == 0 && this.salesOrderType.id > 0) {
                this.service.getBySalesOrderDurationAndSalesOrderTypePage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.salesOrderType.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.customer.id > 0 && this.salesOrderType.id == 0) {
                this.service.getByCustomerAndSalesOrderDurationPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else {
                this.service.getByCustomerAndSalesOrderDurationAndSalesOrderTypePage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.salesOrderType.id, first, pageSize).subscribe((data: any) => {
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
        this.router.navigate(['/pages/salesOrder/form/' + data.id]);
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/salesOrder/form/' + id]);
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

    /*================== SalesOrderType Filter ===================*/
    filteredSalesOrderTypes: any[];
    filterSalesOrderTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredSalesOrderTypes = [];
        for (let i = 0; i < this.salesOrderTypes.length; i++) {
            let salesOrderType = this.salesOrderTypes[i];
            if (salesOrderType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSalesOrderTypes.push(salesOrderType);
            }
        }
    }
    onSalesOrderTypeSelect(salesOrderType: any) {
        console.log(event)
    }
    /*================== End Of SalesOrderType Filter ===================*/
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
}


