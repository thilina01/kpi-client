import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CostCenterService } from '../../../costCenter/costCenter.service';
import { WorkCenterService } from '../../workCenter.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'work-center-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./workCenterForm.scss'],
    templateUrl: './workCenterForm.html',
})
export class WorkCenterForm {

    JSON: any = JSON;

    public formGroup: FormGroup;
    workCenter: any = {};
    subscription: Subscription;
    workCenterType: any;
    costCenters: any;
    costCenter: any;

    constructor(protected service: WorkCenterService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private costCenterService: CostCenterService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            costCenter: [this.costCenter, Validators.required]

        });
    }

    getCostCenters(): void {
        this.costCenterService.getCombo().subscribe(costCenters => this.costCenters = costCenters);
    }

    ngOnInit(): void {
        this.getCostCenters();
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

    refresh(): void {
        this.getCostCenters();

    }

    loadForm(data: any) {
        if (data != null) {
            this.workCenter = data;
        }
        this.formGroup.patchValue(this.workCenter, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/workCenter/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== Cost Center Filter ===================*/
    filteredCostCenters: any[];

    filterCostCenters(event) {
        let query = event.query.toLowerCase();
        this.filteredCostCenters = [];
        for (let i = 0; i < this.costCenters.length; i++) {
            let costCenter = this.costCenters[i];
            if (costCenter.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredCostCenters.push(costCenter);

            }
        }
    }
    onCostCenterSelect(event: any) {
    }
    /*================== End Of Cost Center Filter ===================*/
}

