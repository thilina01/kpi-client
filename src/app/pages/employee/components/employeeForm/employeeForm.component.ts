import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { EmployeeService } from '../../employee.service';

@Component({
    selector: 'employee-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./employeeForm.scss'],
    templateUrl: './employeeForm.html',
})
export class EmployeeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    subscription: Subscription;
    employee: any = {};
    dateOfBirth: Date;

    constructor(protected service: EmployeeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            firstName: '',
            lastName: '',
            contactNumber: '',
            address: '',
            dateOfBirth: [this.dateOfBirth, Validators.required],
            nic: ['', Validators.required],
            code: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
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

    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
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
