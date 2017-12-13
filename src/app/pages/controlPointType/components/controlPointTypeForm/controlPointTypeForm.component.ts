import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ControlPointTypeService } from '../../controlPointType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'control-point-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./controlPointTypeForm.scss'],
    templateUrl: './controlPointTypeForm.html',
})
export class ControlPointTypeForm {
    JSON: any = JSON;

    controlPointType: any = {};

    constructor(protected service: ControlPointTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(controlPointType => { if (controlPointType) this.controlPointType = controlPointType; });
        }
    }

    public save(controlPointType: any): void {
        this.service.save(controlPointType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/controlPointType/form/']);
            }
        );
    }
}
