import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { PaintService } from '../../paint.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'paint-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./paintForm.scss'],
    templateUrl: './paintForm.html',
})
export class PaintForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    subscription: Subscription;
    paintType: any;
    paint: any;

    constructor(protected service: PaintService,
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
            this.paint = data;
        }
        this.formGroup.patchValue(this.paint, { onlySelf: true });
        this.paintType = this.paint.paintType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/paint/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
