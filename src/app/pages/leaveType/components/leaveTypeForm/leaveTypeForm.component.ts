import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LeaveTypeService } from '../../leaveType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'leave-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./leaveTypeForm.scss'],
    templateUrl: './leaveTypeForm.html',
})
export class LeaveTypeForm {
    JSON: any = JSON;

    leaveType: any = {};

    constructor(protected service: LeaveTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(leaveType => { if (leaveType) this.leaveType = leaveType; });
        }
    }

    public save(leaveType: any): void {
        this.service.save(leaveType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/leaveType/form/']);
            }
        );
    }
}
