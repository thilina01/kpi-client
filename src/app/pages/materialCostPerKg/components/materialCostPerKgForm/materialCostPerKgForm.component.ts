import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { MaterialCostPerKgService } from "../../materialCostPerKg.service";

@Component({
    selector: 'material-cost-per-kg-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./materialCostPerKgForm.scss'],
    templateUrl: './materialCostPerKgForm.html',
})
export class MaterialCostPerKgForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    materialCostPerKg: any = {};
    subscription: Subscription;
    effectiveMonth: Date;

    constructor(protected service: MaterialCostPerKgService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService) {
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
            this.materialCostPerKg = data;
        }
        this.formGroup.patchValue(this.materialCostPerKg, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/materialCostPerKg/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
