import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { CostCenterService } from '../../../../services/costCenter.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'customer-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./costCenterForm.scss'],
    templateUrl: './costCenterForm.html',
})
export class CostCenterForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    costCenter: any = {};
    subscription: Subscription;

    costCenterTypes: any;
    paints: any;

    costCenterDate: Date;
    costCenterTime: Date = new Date();
    recoveryTime: Date = new Date();
    costCenterType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: CostCenterService,
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
            data.costCenterTime = new Date(data.costCenterTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.costCenter = data;
        }
        this.formGroup.patchValue(this.costCenter, { onlySelf: true });
        this.costCenterType = this.costCenter.costCenterType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/costCenter/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
