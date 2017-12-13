import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ShiftService } from '../../shift.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'shift-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shiftForm.scss'],
    templateUrl: './shiftForm.html',
})
export class ShiftForm {

    JSON: any = JSON;

    shift: any = {};

    constructor(protected service: ShiftService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(shift => { if (shift) this.shift = shift; });
        }
    }

    public save(shift: any): void {
        this.service.save(shift).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/shift/form/']);
            }
        );
    }
}
