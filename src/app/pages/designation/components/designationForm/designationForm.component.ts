import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DesignationService } from '../../designation.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'designation-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./designationForm.scss'],
    templateUrl: './designationForm.html',
})
export class DesignationForm {

    JSON: any = JSON;

    designation: any = {};
    
    constructor(protected service: DesignationService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.service.get(+id).take(1).subscribe(designation => { if (designation) this.designation = designation; } );
        }
    }

    public save(designation: any): void {
        this.service.save(designation).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/designation/form/']);
            }
        );
    }
}
