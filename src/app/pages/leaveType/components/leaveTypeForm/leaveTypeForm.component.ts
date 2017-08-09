import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';



import { SharedService } from '../../../../services/shared.service';
import { LeaveTypeService } from "../../leaveType.service";

@Component({
    selector: 'leave-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./leaveTypeForm.scss'],
    templateUrl: './leaveTypeForm.html',
})
export class LeaveTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    leaveType: any = {};
    subscription: Subscription;

    leaveTypeTypes: any;
    paints: any;

    leaveTypeDate: Date;
    leaveTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    leaveTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: LeaveTypeService,
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
            this.leaveType = data;
        }
        this.formGroup.patchValue(this.leaveType, { onlySelf: true });
        this.leaveTypeType = this.leaveType.leaveTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/leaveType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
