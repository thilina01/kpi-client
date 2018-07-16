import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CodeNameService } from '../../codeName.service';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';

@Component({
  selector: 'code-name-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./codeNameTable.scss'],
  templateUrl: './codeNameTable.html',
})

export class CodeNameTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  title: string = '';
  subscription: Subscription;

  constructor(protected service: CodeNameService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router) {
    this.subscription = router.events.filter((evt) => evt instanceof NavigationEnd).subscribe((evt) => {
      this.loadData();
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  loadData() {
    this.title = _.startCase(pluralize.singular(this.service.endPoint));
    this.rows = [];
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/' + this.service.endPoint + '/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/' + this.service.endPoint + '/form/' + id]);
  }

  navigateToImport(): void {
    this.router.navigate(['/pages/' + this.service.endPoint + '/import']);
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
}
