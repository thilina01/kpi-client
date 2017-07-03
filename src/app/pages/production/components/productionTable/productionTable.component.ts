import { ProductionService } from '../../../../services/production.service';
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';

@Component({
    selector: 'production-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productionTable.scss'],
    templateUrl: './productionTable.html',
})
export class ProductionTable {

    //msgs: Message[];
    totalRecords: number;
    production = {};
    rows = [];
    timeout: any;
    columns = [
        { prop: 'id', name: 'ID' },
        { prop: 'code', name: 'Code' },
        { prop: 'description', name: 'Description' },
        { prop: 'productionType.type', name: 'Type' }
    ];

    constructor(protected service: ProductionService, private router: Router, private confirmationService: ConfirmationService, private sharedService: SharedService) {
        this.loadData();
        //sharedService.msgs$.subscribe(msgs=>this.msgs = msgs);
    }

    loadData() {
        this.service.getPage(0, 20).then((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    selected(data: any) {
        //this.service.setSelected(data.id);
        //        this.service.getSelected().then((data) => {
        //            this.production = data;
        //        });
    }
    onRowDblclick(data: any): void {
        this.router.navigate(['/pages/production/form/' + data.id]);
    }
    /*
        edit(id: number) {
            this.service.setSelected(id);
            this.router.navigate(['/pages/production/form']);
            //alert(id);
        }*/
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

    lazy(event: any, table: any) {
        const search = table.globalFilter ? table.globalFilter.value : null;
        this.service.getPage((event.first / event.rows), event.rows).then((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
        /*
        this.service.getAll().then((data) => {
          this.rows = data;
        });*/
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
}
