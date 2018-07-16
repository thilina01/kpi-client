import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ElectricityCostPerKgService } from '../../electricityCostPerKg.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'electricity-cost-per-kg-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./electricityCostPerKgForm.scss'],
    templateUrl: './electricityCostPerKgForm.html',
})
export class ElectricityCostPerKgForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    electricityCostPerKg: any = {};
    subscription: Subscription;
    effectiveMonth: Date;

    constructor(protected service: ElectricityCostPerKgService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService
    ) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            actual: ['', Validators.required],
            budget: ['', Validators.required]
        });
    }

    ngOnInit(): void {
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

    loadForm(data: any) {
        if (data != null) {
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.electricityCostPerKg = data;
        }
        this.formGroup.patchValue(this.electricityCostPerKg, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/electricityCostPerKg/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
