import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { EmployeeCategoryService } from '../../employeeCategory.service';

@Component({
    selector: 'employee-category-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./employeeCategoryForm.scss'],
    templateUrl: './employeeCategoryForm.html',
})
export class EmployeeCategoryForm {

    JSON: any = JSON;

    public formGroup: FormGroup;
    employeeCategory: any = {};
    subscription: Subscription;
    employeeCategoryType: any;

    constructor(protected service: EmployeeCategoryService,
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
            this.employeeCategory = data;
        }
        this.formGroup.patchValue(this.employeeCategory, { onlySelf: true });
        this.employeeCategoryType = this.employeeCategory.employeeCategoryType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/employeeCategory/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
