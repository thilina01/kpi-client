import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SalesOrderTypeService } from '../../salesOrderType.service';

@Component({
    selector: 'sales-order-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesOrderTypeForm.scss'],
    templateUrl: './salesOrderTypeForm.html',
})
export class SalesOrderTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    salesOrderType: any = {};
    subscription: Subscription;
    salesOrderTypes: any;

    constructor(protected service: SalesOrderTypeService,
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
            this.salesOrderType = data;
        }
        this.formGroup.patchValue(this.salesOrderType, { onlySelf: true });
        this.salesOrderType = this.salesOrderType.salesOrderType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/salesOrderType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
