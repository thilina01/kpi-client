import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DeliveryTermService } from '../../deliveryTerm.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'delivery-term-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./deliveryTermForm.scss'],
    templateUrl: './deliveryTermForm.html',
})
export class DeliveryTermForm {
    JSON: any = JSON;

    deliveryTerm: any = {};

    constructor(protected service: DeliveryTermService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(deliveryTerm => { if (deliveryTerm) this.deliveryTerm = deliveryTerm; });
        }
    }

    public save(deliveryTerm: any): void {
        this.service.save(deliveryTerm).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/deliveryTerm/form/']);
            }
        );
    }
}
