import { JobService } from '../../../../services/job.service';
import { Component, ViewEncapsulation } from '@angular/core';

import { ConfirmationService, Message } from 'primeng/primeng';

import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'job-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./jobTable.scss'],
  templateUrl: './jobTable.html',
})
export class JobTable {
  jobs = [];
  timeout: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'jobNo', name: 'Job Number' },
    { prop: 'jobDate', name: 'Date' },
    { prop: 'jobType.type', name: 'Type' },
    { prop: 'item.code', name: 'Item' }
  ];

  constructor(protected service: JobService, private confirmationService: ConfirmationService, private sharedService: SharedService) {
    this.loadData();
  }
  
    loadData() {
        this.service.getAll().then((data) => {
            this.jobs = data;
        });
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
