import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { MailConfigurationService } from '../../mailConfiguration.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'mail-configuration-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./mailConfigurationForm.scss'],
    templateUrl: './mailConfigurationForm.html',
})
export class MailConfigurationForm {
    JSON: any = JSON;

    mailConfiguration: any = {};

    constructor(protected service: MailConfigurationService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(mailConfiguration => { if (mailConfiguration) this.mailConfiguration = mailConfiguration; });
        }
    }

    public save(mailConfiguration: any): void {
        this.service.save(mailConfiguration).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/mailConfiguration/form/']);
            }
        );
    }
}
