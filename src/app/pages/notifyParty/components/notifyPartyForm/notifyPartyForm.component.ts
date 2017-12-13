import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { NotifyPartyService } from '../../notifyParty.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'notify-party-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./notifyPartyForm.scss'],
    templateUrl: './notifyPartyForm.html',
})
export class NotifyPartyForm {
    JSON: any = JSON;

    notifyParty: any = {};

    constructor(protected service: NotifyPartyService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(notifyParty => { if (notifyParty) this.notifyParty = notifyParty; });
        }
    }

    public save(notifyParty: any): void {
        this.service.save(notifyParty).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/notifyParty/form/']);
            }
        );
    }
}
