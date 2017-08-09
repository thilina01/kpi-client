import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';



import { SharedService } from '../../../../services/shared.service';
import { LossReasonService } from "../../lossReason.service";

@Component({
    selector: 'loss-reason-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./lossReasonForm.scss'],
    templateUrl: './lossReasonForm.html',
})
export class LossReasonForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    lossReason: any = {};
    subscription: Subscription;

    lossReasonTypes: any;
    paints: any;

    lossReasonDate: Date;
    lossReasonTime: Date = new Date();
    recoveryTime: Date = new Date();
    lossReasonType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: LossReasonService,
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
            this.lossReason = data;
        }
        this.formGroup.patchValue(this.lossReason, { onlySelf: true });
        this.lossReasonType = this.lossReason.lossReasonType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
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

}
