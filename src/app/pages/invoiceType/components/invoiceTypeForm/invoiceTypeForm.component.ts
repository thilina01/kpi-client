import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { InvoiceTypeService } from '../../invoiceType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'invoice-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoiceTypeForm.scss'],
    templateUrl: './invoiceTypeForm.html',
})
export class InvoiceTypeForm {
    JSON: any = JSON;

    invoiceType: any = {};

    constructor(protected service: InvoiceTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(invoiceType => { if (invoiceType) this.invoiceType = invoiceType; });
        }
    }

    public save(invoiceType: any): void {
        this.service.save(invoiceType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/invoiceType/form/']);
            }
        );
    }
}
