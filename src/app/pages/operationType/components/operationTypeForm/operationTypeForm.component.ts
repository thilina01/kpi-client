import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { OperationTypeService } from '../../operationType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'operation-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./operationTypeForm.scss'],
    templateUrl: './operationTypeForm.html',
})
export class OperationTypeForm {
    JSON: any = JSON;

    operationType: any = {};

    constructor(protected service: OperationTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(operationType => { if (operationType) this.operationType = operationType; });
        }
    }

    public save(operationType: any): void {
        this.service.save(operationType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/operationType/form/']);
            }
        );
    }
}
