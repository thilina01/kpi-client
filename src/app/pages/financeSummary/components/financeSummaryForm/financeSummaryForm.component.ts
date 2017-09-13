import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { FinanceSummaryService } from "../../financeSummary.service";

@Component({
    selector: 'finance-summary-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./financeSummaryForm.scss'],
    templateUrl: './financeSummaryForm.html',
})
export class FinanceSummaryForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    financeSummary: any = {};
    subscription: Subscription;
    effectiveMonth: Date;

    constructor(protected service: FinanceSummaryService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            actualRevenue: '',
            budgetRevenue: '',
            actualGrossProfit: '',
            budgetGrossProfit: '',
            actualNetProfit: '',
            budgetNetProfit: '',
            actualEbitda:  '',
            budgetEbitda: '',
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
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.financeSummary = data;
        }
        this.formGroup.patchValue(this.financeSummary, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/financeSummary/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
