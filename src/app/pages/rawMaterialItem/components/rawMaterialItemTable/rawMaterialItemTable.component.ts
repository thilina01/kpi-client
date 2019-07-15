
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { RawMaterialItemService } from '../../rawMaterialItem.service';

@Component({
    selector: 'raw-material-item-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./rawMaterialItemTable.scss'],
    templateUrl: './rawMaterialItemTable.html',
})
export class RawMaterialItemTable {

    rawMaterialItem = {};
    rows = [];
    timeout: any;
    totalRecords: number;

    constructor(protected service: RawMaterialItemService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private sharedService: SharedService) {
        this.loadData();
    }

    loadData() {
        this.service.getPage(0, 20).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    lazy(event: any) {
        this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    selected(data: any) {
    }

    onRowDblclick(data: any): void {
      window.open('/#/pages/rawMaterialItem/form/' + data.id, '_blank');
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/rawMaterialItem/form/' + id]);
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

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
}
