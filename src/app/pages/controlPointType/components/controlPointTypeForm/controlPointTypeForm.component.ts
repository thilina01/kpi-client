import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { SharedService } from '../../../../services/shared.service';
import { ControlPointTypeService } from "../../controlPointType.service";

@Component({
    selector: 'control-point-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./controlPointTypeForm.scss'],
    templateUrl: './controlPointTypeForm.html',
})
export class ControlPointTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    controlPointType: any = {};
    subscription: Subscription;
    controlPointTypes: any;

    constructor(protected service: ControlPointTypeService,
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
            this.controlPointType = data;
        }
        this.formGroup.patchValue(this.controlPointType, { onlySelf: true });
        this.controlPointType = this.controlPointType.controlPointType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/controlPointType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
