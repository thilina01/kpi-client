import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { TreatmentTypeService } from '../../treatmentType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'treatment-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./treatmentTypeForm.scss'],
    templateUrl: './treatmentTypeForm.html',
})
export class TreatmentTypeForm {
    JSON: any = JSON;

    treatmentType: any = {};

    constructor(protected service: TreatmentTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(treatmentType => { if (treatmentType) this.treatmentType = treatmentType; });
        }
    }

    public save(treatmentType: any): void {
        this.service.save(treatmentType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/treatmentType/form/']);
            }
        );
    }
}
