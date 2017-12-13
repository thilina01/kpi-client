import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DepartmentService } from '../../department.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'department-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./departmentForm.scss'],
    templateUrl: './departmentForm.html',
})
export class DepartmentForm {
    JSON: any = JSON;

    department: any = {};

    constructor(protected service: DepartmentService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(department => { if (department) this.department = department; });
        }
    }

    public save(department: any): void {
        this.service.save(department).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/department/form/']);
            }
        );
    }
}
