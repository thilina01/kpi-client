import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { RawMaterialItemService } from '../../rawMaterialItem.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'raw-material-item-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./rawMaterialItemForm.scss'],
    templateUrl: './rawMaterialItemForm.html',
})
export class RawMaterialItemForm {
    customerList: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    rawMaterialItem: any = {};
    subscription: Subscription;
    constructor(protected service: RawMaterialItemService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            description: ['', Validators.required],
            unitWeight: ['', Validators.required],
            numberOfPieces: ['', Validators.required]
        });
    }

    ngOnInit(): void {
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

    }

    loadForm(data: any) {
        if (data != null) {
            this.rawMaterialItem = data;
        }
        this.formGroup.patchValue(this.rawMaterialItem, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/rawMaterialItem/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
