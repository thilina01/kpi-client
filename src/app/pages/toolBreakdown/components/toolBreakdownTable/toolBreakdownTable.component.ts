import { ToolBreakdownService } from '../../../../services/toolBreakdown.service';
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';

@Component({
    selector: 'tool-breakdown-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolBreakdownTable.scss'],
    templateUrl: './toolBreakdownTable.html',
})
export class ToolBreakdownTable {

    toolBreakdown = {};
    rows = [];
    timeout: any;
    columns = [
        { prop: 'id', name: 'ID' },
        { prop: 'code', name: 'Code' },
        { prop: 'description', name: 'Description' },
        { prop: 'toolBreakdownType.type', name: 'Type' }
    ];

    constructor(protected service: ToolBreakdownService, private router: Router, private confirmationService: ConfirmationService, private sharedService: SharedService) {
        this.loadData();
    }

    loadData() {
        this.service.getAll().then((data) => {
            this.rows = data;
        });
    }

    selected(data: any) {
    }

    onRowDblclick(data: any): void {
        this.router.navigate(['/pages/toolBreakdown/form/' + data.id]);
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/toolBreakdown/form/' + id]);
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

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
}
