import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { NotifyPartyService } from "../../notifyParty.service";

@Component({
    selector: 'notify-party-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./notifyPartyForm.scss'],
    templateUrl: './notifyPartyForm.html',
})
export class NotifyPartyForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    notifyParty: any = {};
    subscription: Subscription;

    notifyPartyTypes: any;
    paints: any;

    notifyPartyDate: Date;
    notifyPartyTime: Date = new Date();
    recoveryTime: Date = new Date();
    notifyPartyType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

    constructor(protected service: NotifyPartyService,
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
            this.notifyParty = data;
        }
        this.formGroup.patchValue(this.notifyParty, { onlySelf: true });
        this.notifyPartyType = this.notifyParty.notifyPartyType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/notifyParty/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
