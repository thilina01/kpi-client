import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { CustomerTypeService } from '../../../../services/customerType.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'customer-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./customerTypeForm.scss'],
    templateUrl: './customerTypeForm.html',
})
export class CustomerTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    customerType: any = {};
    subscription: Subscription;

    customerTypeTypes: any;
    paints: any;

    customerTypeDate: Date;
    customerTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    customerTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: CustomerTypeService,
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
            data.customerTypeTime = new Date(data.customerTypeTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.customerType = data;
        }
        this.formGroup.patchValue(this.customerType, { onlySelf: true });
        this.customerTypeType = this.customerType.customerTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/customerType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}