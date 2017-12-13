import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CustomerTypeService } from '../../customerType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'customer-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./customerTypeForm.scss'],
    templateUrl: './customerTypeForm.html',
})
export class CustomerTypeForm {
    JSON: any = JSON;

    customerType: any = {};

    constructor(protected service: CustomerTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(customerType => { if (customerType) this.customerType = customerType; });
        }
    }

    public save(customerType: any): void {
        this.service.save(customerType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/customerType/form/']);
            }
        );
    }
}
