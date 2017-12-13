import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SectionTypeService } from '../../sectionType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'section-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sectionTypeForm.scss'],
    templateUrl: './sectionTypeForm.html',
})
export class SectionTypeForm {
    JSON: any = JSON;

    sectionType: any = {};

    constructor(protected service: SectionTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(sectionType => { if (sectionType) this.sectionType = sectionType; });
        }
    }

    public save(sectionType: any): void {
        this.service.save(sectionType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/sectionType/form/']);
            }
        );
    }
}
