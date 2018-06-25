import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { SubcontractOperationRateService } from '../../subcontractOperationRate.service';
import { SubcontractOperationDefinitionService } from '../../../subcontractOperationDefinition/subcontractOperationDefinition.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';

@Component({
  selector: 'subcontract-operation-rate-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractOperationRateTable.scss'],
  templateUrl: './subcontractOperationRateTable.html'
})
export class SubcontractOperationRateTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  subcontractor: any = { id: 0, code: 'ALL', display: 'All Subcontractors' };
  subcontractOperationDefinition: any = {
    id: 0,
    code: 'ALL',
    display: 'All Subcontract Operation Definitions'
  };
  subcontractOperationDefinitions: any;
  subcontractors: any;
  pageSize = 20;

  constructor(
    protected service: SubcontractOperationRateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private subcontractOperationDefinitionService: SubcontractOperationDefinitionService,
    private subcontractorService: SubcontractorService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getSubcontractOperationDefinitions();
    this.getSubcontractors();
  }

  getSubcontractOperationDefinitions(): void {
    this.subcontractOperationDefinitionService
      .getCombo()
      .subscribe(subcontractOperationDefinitions => {
        this.subcontractOperationDefinitions = subcontractOperationDefinitions;
        this.subcontractOperationDefinitions.unshift({
          id: 0,
          code: 'ALL',
          display: 'All Subcontract Operation Definitions'
        });
      });
  }

  getSubcontractors(): void {
    this.subcontractorService.getCombo().subscribe(subcontractors => {
      this.subcontractors = subcontractors;
      this.subcontractors.unshift({
        id: 0,
        code: 'ALL',
        display: 'All Subcontractors'
      });
    });
  }

  loadData() {
    if (this.subcontractor !== undefined ? this.subcontractor.id : 0, this.subcontractOperationDefinition !== undefined ? this.subcontractOperationDefinition.id : 0) {
      this.service.getSubcontractOperationRatePage(0, 0,  0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.service.getPage(0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

    lazy(event: any, table: any) {
      const search = table.globalFilter ? table.globalFilter.value : null;
      if (this.subcontractor !== undefined ? this.subcontractor.id : 0, this.subcontractOperationDefinition !== undefined ? this.subcontractOperationDefinition.id : 0) {
        this.service.getSubcontractOperationRatePage(0, 0, 0, 20).subscribe((data: any) => {
          this.rows = data.content;
          this.totalRecords = data.totalElements;
        });
      } else {
        this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
          this.rows = data.content;
          this.totalRecords = data.totalElements;
        });
      }
    }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSubcontractOperationRatePage(
        this.subcontractor !== undefined ? this.subcontractor.id : 0,
        this.subcontractOperationDefinition !== undefined
          ? this.subcontractOperationDefinition.id
          : 0,
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  // onRowDblclick(data: any): void {
  //   this.router.navigate(['/pages/subcontractOperationRate/form/' + data.id]);
  // }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/subcontractOperationRate/form/' + id]);
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

  /*================== Subcontractor Filter ===================*/
  filteredSubcontractors: any[];
  filterSubcontractors(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractors = [];
    for (let i = 0; i < this.subcontractors.length; i++) {
      let subcontractor = this.subcontractors[i];
      if (subcontractor.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractors.push(subcontractor);
      }
    }
  }
  onSubcontractorSelect(subcontractor: any) {
    console.log(event);
    this.subcontractor = subcontractor;

  }
  /*================== Subcontractor Filter ===================*/
  /*================== SubcontractOperationDefinition Filter ===================*/
  filteredSubcontractOperationDefinitions: any[];
  filterSubcontractOperationDefinitions(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractOperationDefinitions = [];
    for (let i = 0; i < this.subcontractOperationDefinitions.length; i++) {
      let subcontractOperationDefinition = this.subcontractOperationDefinitions[
        i
      ];
      if (
        subcontractOperationDefinition.display.toLowerCase().indexOf(query) >= 0
      ) {
        this.filteredSubcontractOperationDefinitions.push(
          subcontractOperationDefinition
        );
      }
    }
  }
  onSubcontractOperationDefinitionSelect(subcontractOperationDefinition: any) {
    console.log(event);
    this.subcontractOperationDefinition = subcontractOperationDefinition;

  }
  /*================== SubcontractOperationDefinition Filter ===================*/
}
