import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ProductTypeService } from '../../productType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'product-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productTypeForm.scss'],
    templateUrl: './productTypeForm.html',
})
export class ProductTypeForm {
    JSON: any = JSON;

    productType: any = {};

    constructor(protected service: ProductTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(productType => { if (productType) this.productType = productType; });
        }
    }

    public save(productType: any): void {
        this.service.save(productType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/productType/form/']);
            }
        );
    }
}
