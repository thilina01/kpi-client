import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemTypeService } from '../../itemType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'item-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./itemTypeForm.scss'],
    templateUrl: './itemTypeForm.html',
})
export class ItemTypeForm {
    JSON: any = JSON;

    itemType: any = {};

    constructor(protected service: ItemTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(itemType => { if (itemType) this.itemType = itemType; });
        }
    }

    public save(itemType: any): void {
        this.service.save(itemType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/itemType/form/']);
            }
        );
    }
}
