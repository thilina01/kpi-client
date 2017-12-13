import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LabourSourceService } from '../../labourSource.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'labour-source-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./labourSourceForm.scss'],
    templateUrl: './labourSourceForm.html',
})
export class LabourSourceForm {
    JSON: any = JSON;

    labourSource: any = {};

    constructor(protected service: LabourSourceService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {

    }
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(labourSource => { if (labourSource) this.labourSource = labourSource; });
        }
    }

    public save(labourSource: any): void {
        this.service.save(labourSource).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/labourSource/form/']);
            }
        );
    }
}




