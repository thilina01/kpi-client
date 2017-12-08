import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ShiftService } from '../../shift.service';

@Component({
    selector: 'shift-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shiftForm.scss'],
    templateUrl: './shiftForm.html',
})
export class ShiftForm {

    JSON: any = JSON;

    public formGroup: FormGroup;
    shift: any = {};
    subscription: Subscription;
    shiftType: any;

    constructor(protected service: ShiftService,
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
                    this.service.get(+id).subscribe(
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
            this.shift = data;
        }
        this.formGroup.patchValue(this.shift, { onlySelf: true });
        this.shiftType = this.shift.shiftType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/shift/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
