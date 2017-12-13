import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { IncotermService } from '../../incoterm.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'incoterm-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./incotermForm.scss'],
    templateUrl: './incotermForm.html',
})
export class IncotermForm {
    JSON: any = JSON;

    incoterm: any = {};

    constructor(protected service: IncotermService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(incoterm => { if (incoterm) this.incoterm = incoterm; });
        }
    }

    public save(incoterm: any): void {
        this.service.save(incoterm).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/incoterm/form/']);
            }
        );
    }
}
