import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LossReasonService } from '../../lossReason.service';
import { LossTypeService } from '../../../lossType/lossType.service';

@Component({
    selector: 'loss-reason-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./lossReasonForm.scss'],
    templateUrl: './lossReasonForm.html',
})
export class LossReasonForm {
    JSON: any = JSON;
    public formGroup: FormGroup;
    subscription: Subscription;

    lossTypeList = [];

    constructor(protected service: LossReasonService,
        private route: ActivatedRoute,
        private router: Router,
        private lossTypeService: LossTypeService,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            lossType: ['', Validators.required]
        });
    }

    getLossTypeList(): void {
        this.lossTypeService.getCombo().subscribe(lossTypeList => this.lossTypeList = lossTypeList);
    }

    ngOnInit(): void {
        this.getLossTypeList();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    refresh(): void {
        this.getLossTypeList();

    }

    loadForm(data: any) {
        if (data != null) {
            this.formGroup.patchValue(data, { onlySelf: true });
        }
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/lossReason/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== Loss Type Filter ===================*/
    filteredLossTypes: any[];

    filterLossTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredLossTypes = [];
        for (let i = 0; i < this.lossTypeList.length; i++) {
            let lossType = this.lossTypeList[i];
            if (lossType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredLossTypes.push(lossType);

            }
        }
    }
    onLossTypeSelect(event: any) {
    }
    /*================== End Of Loss Type Filter ===================*/
}
