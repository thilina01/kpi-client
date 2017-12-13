import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ShiftTypeService } from '../../shiftType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'shift-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shiftTypeForm.scss'],
    templateUrl: './shiftTypeForm.html',
})
export class ShiftTypeForm {

    JSON: any = JSON;

    shiftType: any = {};

    constructor(protected service: ShiftTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(shiftType => { if (shiftType) this.shiftType = shiftType; });
        }
    }

    public save(shiftType: any): void {
        this.service.save(shiftType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/shiftType/form/']);
            }
        );
    }
}
