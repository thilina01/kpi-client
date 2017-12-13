import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ShiftRosterService } from '../../shiftRoster.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'shift-roster-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shiftRosterForm.scss'],
    templateUrl: './shiftRosterForm.html',
})
export class ShiftRosterForm {

    JSON: any = JSON;

    shiftRoster: any = {};

    constructor(protected service: ShiftRosterService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(shiftRoster => { if (shiftRoster) this.shiftRoster = shiftRoster; });
        }
    }

    public save(shiftRoster: any): void {
        this.service.save(shiftRoster).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/shiftRoster/form/']);
            }
        );
    }
}
