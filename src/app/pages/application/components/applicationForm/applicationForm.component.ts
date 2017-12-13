import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import {  AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ApplicationService } from '../../application.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'application-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./applicationForm.scss'],
    templateUrl: './applicationForm.html',
})
export class ApplicationForm {
    JSON: any = JSON;

    application: any = {};
    
    constructor(protected service: ApplicationService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
       
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.service.get(+id).take(1).subscribe(application => { if (application) this.application = application; } );
        }
    }

    public save(application: any): void {
        this.service.save(application).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/application/form/']);
            }
        );
    }
}
