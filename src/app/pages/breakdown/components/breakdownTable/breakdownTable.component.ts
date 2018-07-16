import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { BreakdownService } from '../../breakdown.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { MachineService } from '../../../machine/machine.service';

@Component({
  selector: 'breakdown-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./breakdownTable.scss'],
  templateUrl: './breakdownTable.html'
})
export class BreakdownTable {
  filteredMachines: any[];
  breakdown = {};
  rows = [];
  pageSize = 20;
  timeout: any;
  totalRecords: number;
  machines: any;
  @ViewChild(DataTable) dataTable: DataTable;
  machine: any = { id: 0, code: 'ALL', display: 'All Machines' };
  startDate: Date;
  endDate: Date;
  constructor(
    protected service: BreakdownService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private machineService: MachineService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getMachines();
  }

  getMachines(): void {
    this.machineService.getCombo().subscribe(machines => {
      this.machines = machines;
      this.machines.unshift({ id: 0, code: 'ALL', display: 'All Machines' });
    });
  }

  loadData() {
    this.service
      .getBreakdownPage(0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getBreakdownPage(
        this.machine !== undefined ? this.machine.id : 0,
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

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {}

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/breakdown/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/breakdown/form/' + id]);
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
          //this.msgs.push();
          this.loadData();
        });
      }
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }
  /*================== Machine Filter ===================*/
  filterMachines(event) {
    let query = event.query.toLowerCase();
    this.filteredMachines = [];
    for (let i = 0; i < this.machines.length; i++) {
      let machine = this.machines[i];
      if (machine.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredMachines.push(machine);
      }
    }
  }

  onMachineSelect(machine: any) {
    console.log(event);
    this.machine = machine;
  }

  /*================== End Of Machine Filter ===================*/
}
