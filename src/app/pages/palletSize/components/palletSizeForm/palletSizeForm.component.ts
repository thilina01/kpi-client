import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { PalletSizeService } from '../../palletSize.service';
import { ToolService } from '../../../tool/tool.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'pallet-size-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./palletSizeForm.scss'],
    templateUrl: './palletSizeForm.html',
})
export class PalletSizeForm {
    JSON: any = JSON;
    public formGroup: FormGroup;
    palletSize: any = {};
    subscription: Subscription;
    constructor(protected service: PalletSizeService,
        private route: ActivatedRoute,
        private router: Router, fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            length: ['', Validators.required],
            width: ['', Validators.required],
            weight: ['', Validators.required]
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
            this.palletSize = data;
        }
        this.formGroup.patchValue(this.palletSize, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/palletSize/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}

