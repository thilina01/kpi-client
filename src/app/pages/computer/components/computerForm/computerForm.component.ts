import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ComputerService } from '../../computer.service';
import { EmployeeService } from '../../../employee/employee.service';
import { ComputerTypeService } from '../../../computerType/computerType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'computer-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./computerForm.scss'],
    templateUrl: './computerForm.html',
})
export class ComputerForm {
    computerTypeList = [];
    employeeList = [];
    computerType: any;
    employee: any;
    transferDate: Date;
    purchaseDate: Date;
    JSON: any = JSON;

    public formGroup: FormGroup;
    computer: any = {};
    subscription: Subscription;

    constructor(protected service: ComputerService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private employeeService: EmployeeService,
        private computerTypeService: ComputerTypeService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            brand: ['', Validators.required],
            model: ['', Validators.required],
            ram: '',
            processor: '',
            hdd1: '',
            hdd2: '',
            lanMac: '',
            wlanMac: '',
            lanIp: '',
            wlanIp: '',
            value: '',
            code: ['', Validators.required],
            purchaseDate: [this.purchaseDate, Validators.required],
            transferDate: '',
            employee: [this.employee, ''],
            computerType: [this.computerType, Validators.required]
        });
    }

    getEmployeeList(): void {
        this.employeeService.getCombo().subscribe(employeeList => this.employeeList = employeeList);
    }

    getComputerTypeList(): void {
        this.computerTypeService.getCombo().subscribe(computerTypeList => this.computerTypeList = computerTypeList);
    }

    ngOnInit(): void {
        this.getEmployeeList();
        this.getComputerTypeList();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id === undefined ? '0' : id;
                if (id !== '0') {
                    this.service.get(+id).take(1).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }
    refresh(): void {
        this.getEmployeeList();
        this.getComputerTypeList();
    }

    loadForm(data: any) {
        if (data != null) {
            data.purchaseDate = new Date(data.purchaseDate);
            data.transferDate = new Date(data.transferDate);
            this.computer = data;
        }
        this.formGroup.patchValue(this.computer, { onlySelf: true });
        this.employee = this.computer.employee;
        this.computerType = this.computer.computerType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/computer/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== Employee Filter ===================*/
    filteredEmployeeList: any[];

    filterEmployeeList(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployeeList = [];
        for (let i = 0; i < this.employeeList.length; i++) {
            let employee = this.employeeList[i];
            if (employee.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredEmployeeList.push(employee);
            }
        }
    }

    onEmployeeSelect(event: any) {
    }
    /*================== ComputerTypeFilter ===================*/
    filteredComputerTypeList: any[];

    filterComputerTypeList(event) {
        let query = event.query.toLowerCase();
        this.filteredComputerTypeList = [];
        for (let i = 0; i < this.computerTypeList.length; i++) {
            let computerType = this.computerTypeList[i];
            if (computerType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredComputerTypeList.push(computerType);
            }
        }
    }
    onComputerTypeSelect(event: any) {
    }

}





