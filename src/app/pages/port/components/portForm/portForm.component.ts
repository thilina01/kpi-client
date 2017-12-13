import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { PortService } from '../../port.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'port-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./portForm.scss'],
    templateUrl: './portForm.html',
})
export class PortForm {

    JSON: any = JSON;

    port: any = {};

    constructor(protected service: PortService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(port => { if (port) this.port = port; });
        }
    }

    public save(port: any): void {
        this.service.save(port).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/port/form/']);
            }
        );
    }
}
