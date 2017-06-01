import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { LabourTurnoverService } from '../../../../services/labourTurnover.service';
import { SharedService } from '../../../../services/shared.service';
import { LabourSourceService } from '../../../../services/labourSource.service';

@Component({
    selector: 'labourTurnover-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./labourTurnoverForm.scss'],
    templateUrl: './labourTurnoverForm.html',
})
export class LabourTurnoverForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    labourTurnover: any = {};
    subscription: Subscription;

    labourSources: any;

    effectiveMonth: Date;
    labourSource: any = { id: '', code: '' }


    constructor(protected service: LabourTurnoverService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService, private labourSourceService: LabourSourceService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            turnover: ['', Validators.required],
            target: ['', Validators.required],
            labourSource: [this.labourSource, Validators.required]
        });
    }

    getLabourSources(): void {
        this.labourSourceService.getAll().then(labourSources => this.labourSources = labourSources);
    }

    ngOnInit(): void {
        this.getLabourSources();
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
            data.labourTurnoverTime = new Date(data.labourTurnoverTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.labourTurnover = data;
        }
        this.formGroup.patchValue(this.labourTurnover, { onlySelf: true });
        this.labourSource = this.labourTurnover.labourSource;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/labourTurnover/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
