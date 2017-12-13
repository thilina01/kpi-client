import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { OrganizationService } from '../../organization.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'organization-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./organizationForm.scss'],
    templateUrl: './organizationForm.html',
})
export class OrganizationForm {
    JSON: any = JSON;

    organization: any = {};

    constructor(protected service: OrganizationService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {

    }
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(organization => { if (organization) this.organization = organization; });
        }
    }

    public save(organization: any): void {
        this.service.save(organization).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/organization/form/']);
            }
        );
    }
}

