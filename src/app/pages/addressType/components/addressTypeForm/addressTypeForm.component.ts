import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { AddressTypeService } from '../../addressType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'address-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./addressTypeForm.scss'],
    templateUrl: './addressTypeForm.html',
})
export class AddressTypeForm {
    JSON: any = JSON;

    addressType: any = {};

    constructor(protected service: AddressTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(addressType => { if (addressType) this.addressType = addressType; });
        }
    }

    public save(addressType: any): void {
        this.service.save(addressType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/addressType/form/']);
            }
        );
    }
}
