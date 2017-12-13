import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ComputerTypeService } from '../../computerType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'computer-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./computerTypeForm.scss'],
    templateUrl: './computerTypeForm.html',
})
export class ComputerTypeForm {
    JSON: any = JSON;

    computerType: any = {};

    constructor(protected service: ComputerTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(computerType => { if (computerType) this.computerType = computerType; });
        }
    }

    public save(computerType: any): void {
        this.service.save(computerType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/computerType/form/']);
            }
        );
    }
}
