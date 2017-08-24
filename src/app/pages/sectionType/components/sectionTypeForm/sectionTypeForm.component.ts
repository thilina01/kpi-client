import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SectionTypeService } from "../../sectionType.service";

@Component({
    selector: 'section-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sectionTypeForm.scss'],
    templateUrl: './sectionTypeForm.html',
})
export class SectionTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    sectionType: any = {};
    subscription: Subscription;

    sectionTypeTypes: any;
    paints: any;

    sectionTypeDate: Date;
    sectionTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    sectionTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

    constructor(protected service: SectionTypeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            this.sectionType = data;
        }
        this.formGroup.patchValue(this.sectionType, { onlySelf: true });
        this.sectionTypeType = this.sectionType.sectionTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/sectionType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}