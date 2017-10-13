import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { MachineService } from '../../machine.service';

@Component({
    selector: 'machine-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./machineForm.scss'],
    templateUrl: './machineForm.html',
})
export class MachineForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    machine: any = {};
    subscription: Subscription;

    machineTypes: any;
    paints: any;

    machineDate: Date;
    machineTime: Date = new Date();
    recoveryTime: Date = new Date();
    machineType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

    constructor(protected service: MachineService,
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
            this.machine = data;
        }
        this.formGroup.patchValue(this.machine, { onlySelf: true });
        this.machineType = this.machine.machineType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/machine/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
