import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemTypeService } from '../../itemType.service';

@Component({
    selector: 'item-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./itemTypeForm.scss'],
    templateUrl: './itemTypeForm.html',
})
export class ItemTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    itemType: any;
    subscription: Subscription;

    constructor(protected service: ItemTypeService,
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
            this.itemType = data;
        }
        this.formGroup.patchValue(this.itemType, { onlySelf: true });
        this.itemType = this.itemType.itemType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/itemType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
