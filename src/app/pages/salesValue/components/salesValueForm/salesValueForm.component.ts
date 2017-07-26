import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { SalesValueService } from '../../../../services/salesValue.service';
import { SharedService } from '../../../../services/shared.service';


@Component({
    selector: 'salesValue-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesValueForm.scss'],
    templateUrl: './salesValueForm.html',
})
export class SalesValueForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    salesValue: any = {};
    subscription: Subscription;

    labourSources: any;

    effectiveMonth: Date;
    labourSource: any = { id: '', code: '' }


    constructor(protected service: SalesValueService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
        
            actual: ['', Validators.required],
            budget: [this.labourSource, Validators.required]
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
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.salesValue = data;
        }
        this.formGroup.patchValue(this.salesValue, { onlySelf: true });
        this.labourSource = this.salesValue.labourSource;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
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
