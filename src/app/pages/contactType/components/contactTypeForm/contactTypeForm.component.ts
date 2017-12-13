import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ContactTypeService } from '../../contactType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'contact-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./contactTypeForm.scss'],
    templateUrl: './contactTypeForm.html',
})
export class ContactTypeForm {
    JSON: any = JSON;

    contactType: any = {};

    constructor(protected service: ContactTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(contactType => { if (contactType) this.contactType = contactType; });
        }
    }

    public save(contactType: any): void {
        this.service.save(contactType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/contactType/form/']);
            }
        );
    }
}
