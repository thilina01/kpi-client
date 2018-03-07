
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ResourceUtilizationService } from '../../resourceUtilization.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ShiftService } from '../../../shift/shift.service';
import { MachineService } from '../../../machine/machine.service';
import { ProductionService } from '../../../production/production.service';
import { EmployeeService } from '../../../employee/employee.service';

@Component({
    selector: 'resource-utilization-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./resourceUtilizationTable.scss'],
    templateUrl: './resourceUtilizationTable.html',
})

export class ResourceUtilizationTable {
    @ViewChild(DataTable) dataTable: DataTable;
    productionList: any;
    resourceUtilization = {};
    totalRecords: number;
    rows = [];
    timeout: any;
    startDate: Date;
    endDate: Date;
    employees: any;
    shifts: any;
    machines: any;
    shift: any = { id: 0, 'code': 'ALL', 'display': 'All Shifts' }
    employee: any = { id: 0, 'code': 'ALL', 'display': 'All Employees' }
    machine: any = { id: 0, 'code': 'ALL', 'display': 'All Machines' }

    constructor(protected service: ResourceUtilizationService,
        private router: Router,
        private employeeService: EmployeeService,
        private machineService: MachineService,
        private shiftService: ShiftService,
        private confirmationService: ConfirmationService,
        private sharedService: SharedService) {
        this.loadData();
        this.getShifts();
        this.getEmployees();
        this.getMachines();
    }

    getShifts(): void {
        this.shiftService.getCombo().subscribe(shifts => {
            this.shifts = shifts;
            this.shifts.unshift({ id: 0, 'code': 'ALL', 'display': 'All Shifts' });
        });
    }

    getEmployees(): void {
        this.employeeService.getCombo().subscribe(employees => {
            this.employees = employees;
            this.employees.unshift({ id: 0, 'code': 'ALL', 'display': 'All Employees' });
        });
    }

    getMachines(): void {
        this.machineService.getCombo().subscribe(machines => {
            this.machines = machines;
            this.machines.unshift({ id: 0, 'code': 'ALL', 'display': 'All Machines' });
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
            this.machine != undefined &&
            this.machine.id != undefined &&
            this.employee != undefined &&
            this.employee.id != undefined &&
            this.shift != undefined &&
            this.shift.id != undefined) {
            if (this.machine.id == 0 && this.shift.id == 0 && this.employee.id == 0) {
                this.service.getByProductionDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.machine.id == 0 && this.employee.id == 0 && this.shift.id > 0) {
                this.service.getByProductionDurationAndShiftPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.machine.id > 0 && this.shift.id == 0 && this.employee.id == 0) {
                this.service.getByMachineAndProductionDurationPage(this.machine.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.machine.id == 0 && this.shift.id == 0 && this.employee.id > 0) {
                this.service.getByProductionDurationAndEmployeePage(this.employee.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.machine.id > 0 && this.employee.id == 0 && this.shift.id > 0) {
                this.service.getByMachineAndProductionDurationAndShiftPage(this.machine.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.machine.id > 0 && this.shift.id == 0 && this.employee.id > 0) {
                this.service.getByMachineAndProductionDurationAndEmployeePage(this.machine.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.employee.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.employee.id > 0 && this.machine.id == 0 && this.shift.id > 0) {
                this.service.getByEmployeeAndProductionDurationAndShiftPage(this.employee.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else {
                this.service.getByMachineAndEmployeeAndProductionDurationAndShiftPage(this.machine.id, this.employee.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize, ).subscribe((data: any) => {
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
        this.router.navigate(['/pages/resourceUtilization/form/' + data.production.id]);
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/resourceUtilization/form/' + id]);
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

    /*================== Shift Filter ===================*/
    filteredShifts: any;
    filterShifts(event) {
        let query = event.query.toLowerCase();
        this.filteredShifts = [];
        for (let i = 0; i < this.shifts.length; i++) {
            let shift = this.shifts[i];
            if (shift.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredShifts.push(shift);
            }
        }
    }
    onShiftSelect(shift: any) {
        console.log(event)
    }
    /*================== End Of Shift Filter ===================*/
    /*================== Machine Filter ===================*/
    filteredMachines: any[];

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
    }

    /*================== End Of Machine Filter ===================*/
    /*================== Employee Filter ===================*/
    filteredEmployees: any;
    filterEmployees(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployees = [];
        for (let i = 0; i < this.employees.length; i++) {
            let employee = this.employees[i];
            if (employee.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredEmployees.push(employee);
            }
        }
    }
    onEmployeeSelect(employee: any) {
        console.log(event)
    }
    /*================== Employee Filter ===================*/

}



