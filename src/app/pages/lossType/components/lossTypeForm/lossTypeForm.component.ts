import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LossTypeService } from "../../lossType.service";

@Component({
    selector: 'loss-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./lossTypeForm.scss'],
    templateUrl: './lossTypeForm.html',
})
export class LossTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    lossType: any = {};
    subscription: Subscription;

    lossTypeTypes: any;
    paints: any;

    lossTypeDate: Date;
    lossTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    lossTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

    constructor(protected service: LossTypeService,
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
            this.lossType = data;
        }
        this.formGroup.patchValue(this.lossType, { onlySelf: true });
        this.lossTypeType = this.lossType.lossTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/lossType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
