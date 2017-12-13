import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ManpowerTypeService } from '../../manpowerType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'manpower-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./manpowerTypeForm.scss'],
    templateUrl: './manpowerTypeForm.html',
})
export class ManpowerTypeForm {
    JSON: any = JSON;

    manpowerType: any = {};

    constructor(protected service: ManpowerTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(manpowerType => { if (manpowerType) this.manpowerType = manpowerType; });
        }
    }

    public save(manpowerType: any): void {
        this.service.save(manpowerType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/manpowerType/form/']);
            }
        );
    }
}
