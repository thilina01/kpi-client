import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SalesValueService } from '../../salesValue.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'sales-value-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesValueForm.scss'],
    templateUrl: './salesValueForm.html',
})
export class SalesValueForm {
    JSON: any = JSON;
    public formGroup: FormGroup;
    salesValue: any = {};
    subscription: Subscription;
    effectiveMonth: Date;

    constructor(protected service: SalesValueService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
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
            this.salesValue = data;
        }
        this.formGroup.patchValue(this.salesValue, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/salesValue/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
