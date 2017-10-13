import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ComputerTypeService } from '../../computerType.service';

@Component({
    selector: 'computer-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./computerTypeForm.scss'],
    templateUrl: './computerTypeForm.html',
})
export class ComputerTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    computerType: any;
    subscription: Subscription;

    constructor(protected service: ComputerTypeService,
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
            this.computerType = data;
        }
        this.formGroup.patchValue(this.computerType, { onlySelf: true });
        this.computerType = this.computerType.computerType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/computerType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
