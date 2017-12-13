import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { AccidentTypeService } from '../../accidentType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'accident-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accidentTypeForm.scss'],
    templateUrl: './accidentTypeForm.html',
})
export class AccidentTypeForm {
    JSON: any = JSON;

    accidentType: any = {};

    constructor(protected service: AccidentTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(accidentType => { if (accidentType) this.accidentType = accidentType; });
        }
    }

    public save(accidentType: any): void {
        this.service.save(accidentType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/accidentType/form/']);
            }
        );
    }
}
