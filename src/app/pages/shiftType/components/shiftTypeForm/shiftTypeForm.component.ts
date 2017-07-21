import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ShiftTypeService } from '../../../../services/shiftType.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'shift-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shiftTypeForm.scss'],
    templateUrl: './shiftTypeForm.html',
})
export class ShiftTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    shiftType: any = {};
    subscription: Subscription;

    shiftTypeTypes: any;
    paints: any;

    shiftTypeDate: Date;
    shiftTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    shiftTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: ShiftTypeService,
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
            data.shiftTypeTime = new Date(data.shiftTypeTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.shiftType = data;
        }
        this.formGroup.patchValue(this.shiftType, { onlySelf: true });
        this.shiftTypeType = this.shiftType.shiftTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/shiftType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}