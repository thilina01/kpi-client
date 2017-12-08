import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ContainerSizeService } from '../../containerSize.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'container-size-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./containerSizeForm.scss'],
    templateUrl: './containerSizeForm.html',
})
export class ContainerSizeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    containerSize: any;
    subscription: Subscription;

    constructor(protected service: ContainerSizeService,
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
                    this.service.get(+id).take(1).subscribe(
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
            this.containerSize = data;
        }
        this.formGroup.patchValue(this.containerSize, { onlySelf: true });
        this.containerSize = this.containerSize.containerSize;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/containerSize/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
