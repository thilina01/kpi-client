import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { EmployeeService } from '../../../../services/employee.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'employee-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./employeeForm.scss'],
    templateUrl: './employeeForm.html',
})
export class EmployeeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    employee: any = {};
    subscription: Subscription;

    employeeTypes: any;
    paints: any;

    employeeDate: Date;
    employeeTime: Date = new Date();
    recoveryTime: Date = new Date();
    employeeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: EmployeeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required]
        });
    }


    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).then(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            this.employee = data;
        }
        this.formGroup.patchValue(this.employee, { onlySelf: true });
        this.employeeType = this.employee.employeeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/employee/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
