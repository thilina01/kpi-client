import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SupplierTypeService } from '../../supplierType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'supplier-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./supplierTypeForm.scss'],
    templateUrl: './supplierTypeForm.html',
})
export class SupplierTypeForm {
    JSON: any = JSON;

    supplierType: any = {};

    constructor(protected service: SupplierTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(supplierType => { if (supplierType) this.supplierType = supplierType; });
        }
    }

    public save(supplierType: any): void {
        this.service.save(supplierType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/supplierType/form/']);
            }
        );
    }
}
