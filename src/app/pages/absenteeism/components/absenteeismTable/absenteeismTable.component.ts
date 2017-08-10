import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { AbsenteeismService } from "../../absenteeism.service";

@Component({
    selector: 'absenteeism-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./absenteeismTable.scss'],
    templateUrl: './absenteeismTable.html',
})
export class AbsenteeismTable {

    absenteeism = {};
    rows = [];
    timeout: any;
    totalRecords: number;

    constructor(protected service: AbsenteeismService, private router: Router, private confirmationService: ConfirmationService, private sharedService: SharedService) {
        this.loadData();
    }

    loadData() {
        this.service.getPage(0, 20).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    lazy(event: any, table: any) {
        const search = table.globalFilter ? table.globalFilter.value : null;
        this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    selected(data: any) {
    }

    onRowDblclick(data: any): void {
        this.router.navigate(['/pages/absenteeism/form/' + data.id]);
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/absenteeism/form/' + id]);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to Delete?',
            accept: () => {
                this.service.delete(id).subscribe(response => {
                    this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
                    //this.msgs.push();
                    this.loadData()
                }
                );
            }
        });
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
}
