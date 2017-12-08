import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { OperationTypeService } from '../../operationType.service';

@Component({
    selector: 'operation-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./operationTypeForm.scss'],
    templateUrl: './operationTypeForm.html',
})
export class OperationTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    operationType: any = {};
    subscription: Subscription;
    operationTypeType: any;

    constructor(protected service: OperationTypeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).subscribe(
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
            this.operationType = data;
        }
        this.formGroup.patchValue(this.operationType, { onlySelf: true });
        this.operationTypeType = this.operationType.operationTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/operationType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
