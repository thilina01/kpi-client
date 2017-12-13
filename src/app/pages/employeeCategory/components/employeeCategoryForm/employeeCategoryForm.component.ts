import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { EmployeeCategoryService } from '../../employeeCategory.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'employee-category-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./employeeCategoryForm.scss'],
    templateUrl: './employeeCategoryForm.html',
})
export class EmployeeCategoryForm {

    JSON: any = JSON;

    employeeCategory: any = {};

    constructor(protected service: EmployeeCategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {

    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(employeeCategory => { if (employeeCategory) this.employeeCategory = employeeCategory; });
        }
    }

    public save(employeeCategory: any): void {
        this.service.save(employeeCategory).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/employeeCategory/form/']);
            }
        );
    }
}
