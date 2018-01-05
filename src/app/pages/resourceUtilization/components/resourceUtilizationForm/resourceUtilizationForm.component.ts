import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { ProductionService } from '../../../production/production.service';
import 'rxjs/add/operator/take';
import { MachineService } from '../../../machine/machine.service';
import { EmployeeService } from '../../../employee/employee.service';
import { ResourceUtilizationService } from '../../resourceUtilization.service';

@Component({
    selector: 'resource-utilization-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./resourceUtilizationForm.scss'],
    templateUrl: './resourceUtilizationForm.html',

})
export class ResourceUtilizationForm {
    @Input('formGroup')
    @ViewChild(DataTable) dataTable: DataTable;
    public resourceUtilizationFormGroup: FormGroup;
    public formGroup: FormGroup;
    subscription: Subscription;
    resourceUtilization: any = {};
    resourceUtilizationList = [];
    production: any = {};
    productionList = [];
    JSON: any = JSON;
    totalRecords = 0;
    employees: any;
    machines: any;
    employee: any;
    machine: any;
    rows = [];

    constructor(protected service: ProductionService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private resourceUtilizationService: ResourceUtilizationService,
        private confirmationService: ConfirmationService,
        private machineService: MachineService,
        private employeeService: EmployeeService,
        private sharedService: SharedService) {

        this.formGroup = fb.group({
            id: ['', Validators.required],
            resourceUtilizationList: [[]],
        });
        this.resourceUtilizationFormGroup = fb.group({
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            machine: [this.machine, Validators.required],
            employee: [this.employee, Validators.required]
        });
    }

    getMachines(): void {
        this.machineService.getCombo().subscribe(machines => this.machines = machines);
    }

    getEmployees(): void {
        this.employeeService.getCombo().subscribe(employees => this.employees = employees);
    }

    ngOnInit(): void {
        this.getMachines();
        this.getEmployees();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.loadForm(id);
                }
            }
        );
    }

    fill(): void {
        this.clear();
        let id = this.formGroup.value.id;
        if (id == undefined || id == '') { return; }
        this.loadForm(id);
    }

    clear(): void {
        this.production = {};
    }

    keyDown(event) {
        if (event.keyCode === 13) {
            this.clear();
            this.fill();
        }
    }

    loadForm(id: any) {
        this.service.get(+id).take(1).subscribe(
            (data) => {
                if (data != null) {
                    this.production = data;

                }
                this.formGroup.patchValue(this.production, { onlySelf: true });
            }
        )
    }

    addResourceUtilization(value) {

        if (this.production.resourceUtilizationList === undefined) {
            this.production.resourceUtilizationList = [];
        }

        value.startTime = value.startTime.replace(/\./g, ':');
        value.endTime = value.endTime.replace(/\./g, ':');

        value.startTime = new Date(this.production.productionDate + ' ' + value.startTime + ':00');
        value.endTime = new Date(this.production.productionDate + ' ' + value.endTime + ':00');
        value.employee.callingName = value.employee.name;
        this.production.resourceUtilizationList.push(value);
        this.production.resourceUtilizationList = this.production.resourceUtilizationList.slice();
        this.resourceUtilizationFormGroup.reset();
        console.log(this.production);
    }

    public onSubmit(values: any, event: Event): void {

        if (this.formGroup.valid) {
            if (values.production.resourceUtilizationList === null || values.production.resourceUtilizationList.length === 0) {
                alert('Resource Utilization Required');
                return;
            }
        }

        event.preventDefault();
        console.log(this.production);
        this.service.save(this.production).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
            }
        );
    }

    public save(): void {
        delete this.production["manpowerList"];
        delete this.production["operationList"];
        delete this.production["productionEmployeeList"];
        this.service.save(this.production).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
            }
        );
    }

    public removeResourceUtilization(id: number) {
        if (this.production.resourceUtilizationList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.production.resourceUtilizationList.splice(id, 1);
                    this.production.resourceUtilizationList = this.production.resourceUtilizationList.slice();

                }
            });
        }
    }

    public resetForm() {
        this.formGroup.reset();
        this.fill();
        this.resourceUtilizationFormGroup.reset();

    }

    refresh(): void {
        this.getMachines();
        this.getEmployees();
    }

    /*================== Machine Filter ===================*/
    filteredMachines: any[];

    filterMachine(event) {
        let query = event.query.toLowerCase();
        this.filteredMachines = [];
        for (let i = 0; i < this.machines.length; i++) {
            let machine = this.machines[i];
            if (machine.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredMachines.push(machine);

            }
        }
    }

    onMachineSelect(event: any) {
    }

    /*================== End Of Machine Filter ===================*/
    /*================== Employee Filter ===================*/
    filteredEmployees: any[];

    filterEmployee(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployees = [];
        for (let i = 0; i < this.employees.length; i++) {
            let employee = this.employees[i];
            if (employee.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredEmployees.push(employee);

            }
        }
    }

    onEmployeeSelect(event: any) {
    }

    /*================== End Of Employee Filter ===================*/

}



