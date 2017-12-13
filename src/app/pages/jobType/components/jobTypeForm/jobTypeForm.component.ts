import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { JobTypeService } from '../../jobType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'job-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobTypeForm.scss'],
    templateUrl: './jobTypeForm.html',
})
export class JobTypeForm {
    JSON: any = JSON;

    jobType: any = {};

    constructor(protected service: JobTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(jobType => { if (jobType) this.jobType = jobType; });
        }
    }

    public save(jobType: any): void {
        this.service.save(jobType).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/jobType/form/']);
            }
        );
    }
}
