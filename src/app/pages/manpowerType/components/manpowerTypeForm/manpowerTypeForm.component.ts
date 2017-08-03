import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ManpowerTypeService } from '../../../../services/manpowerType.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'manpower-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./manpowerTypeForm.scss'],
    templateUrl: './manpowerTypeForm.html',
})
export class ManpowerTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    manpowerType: any = {};
    subscription: Subscription;

    manpowerTypeTypes: any;
    paints: any;

    manpowerTypeDate: Date;
    manpowerTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    manpowerTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: ManpowerTypeService,
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
                    this.service.getOne(+id).then(
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
            this.manpowerType = data;
        }
        this.formGroup.patchValue(this.manpowerType, { onlySelf: true });
        this.manpowerTypeType = this.manpowerType.manpowerTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/manpowerType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
