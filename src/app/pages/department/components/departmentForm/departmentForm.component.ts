import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../../services/shared.service';
import { DepartmentService } from "../../department.service";

@Component({
    selector: 'department-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./departmentForm.scss'],
    templateUrl: './departmentForm.html',
})
export class DepartmentForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    department: any = {};
    subscription: Subscription;

    departmentTypes: any;
    paints: any;

    departmentDate: Date;
    departmentTime: Date = new Date();
    recoveryTime: Date = new Date();
    departmentType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: DepartmentService,
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
            this.department = data;
        }
        this.formGroup.patchValue(this.department, { onlySelf: true });
        this.departmentType = this.department.departmentType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/department/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
