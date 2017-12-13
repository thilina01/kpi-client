import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LossTypeService } from '../../lossType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'loss-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./lossTypeForm.scss'],
    templateUrl: './lossTypeForm.html',
})
export class LossTypeForm {
    JSON: any = JSON;

    lossType: any = {};

    constructor(protected service: LossTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(lossType => { if (lossType) this.lossType = lossType; });
        }
    }

    public save(lossType: any): void {
        this.service.save(lossType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/lossType/form/']);
            }
        );
    }
}
