import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SalesOrderTypeService } from '../../salesOrderType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'sales-order-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesOrderTypeForm.scss'],
    templateUrl: './salesOrderTypeForm.html',
})
export class SalesOrderTypeForm {
    JSON: any = JSON;

    salesOrderType: any = {};

    constructor(protected service: SalesOrderTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(salesOrderType => { if (salesOrderType) this.salesOrderType = salesOrderType; });
        }
    }

    public save(salesOrderType: any): void {
        this.service.save(salesOrderType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/salesOrderType/form/']);
            }
        );
    }
}
