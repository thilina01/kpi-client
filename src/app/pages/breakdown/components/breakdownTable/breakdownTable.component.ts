import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { BreakdownService } from '../../breakdown.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { SectionService } from '../../../section/section.service';
import { MachineService } from '../../../machine/machine.service';

@Component({
    selector: 'breakdown-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./breakdownTable.scss'],
    templateUrl: './breakdownTable.html',
})
export class BreakdownTable {

    filteredMachines: any[];
    breakdown = {};
    rows = [];
    timeout: any;
    totalRecords: number;
    machines: any;
    @ViewChild(DataTable) dataTable: DataTable;
    machine: any = { id: 0, 'code': 'ALL', 'display': 'All Machines' }
    startDate: Date;
    endDate: Date;
    constructor(protected service: BreakdownService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private machineService: MachineService,
        private sharedService: SharedService) {
        this.loadData();
        this.getMachines();
    }

    getMachines(): void {
        this.machineService.getCombo().subscribe(machines => {
            this.machines = machines;
            this.machines.unshift({ id: 0, 'code': 'ALL', 'display': 'All Machines' });
        });
    }
    
    loadData() {
        if (this.machine.id != undefined && this.machine.id != 0) {
            this.service.getPageByMachine(this.machine, 0, 20).subscribe((data: any) => {
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
        if (this.machine.id != undefined && this.machine.id != 0) {
            this.service.getPageByMachine(this.machine, (event.first / event.rows), event.rows).subscribe((data: any) => {
                this.rows = data.content;
                this.totalRecords = data.totalElements;
            });
        } else {
            this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
                this.rows = data.content;
                this.totalRecords = data.totalElements;
                this.search((event.first / event.rows), event.rows);

            });
        }
    }

    search(first: number, pageSize: number): void {
        if (this.startDate != undefined &&
            this.endDate != undefined &&
            this.machine != undefined &&
            this.machine.id != undefined) {
            if (this.machine.id == 0) {
                this.service.getByBreakdownDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else if (this.machine.id > 0) {
                this.service.getByBreakdownDurationAndMachinePage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.machine.id, first, pageSize).subscribe((data: any) => {
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
        console.log(event)
        this.machine = machine;
        this.loadData();
    }

    /*================== End Of Machine Filter ===================*/
}

