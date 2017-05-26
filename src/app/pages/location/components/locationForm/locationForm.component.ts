import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { LocationService } from '../../../../services/location.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'location-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./locationForm.scss'],
    templateUrl: './locationForm.html',
})
export class LocationForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    location: any = {};
    subscription: Subscription;

    constructor(protected service: LocationService,
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
            data.locationTime = new Date(data.locationTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.location = data;
        }
        this.formGroup.patchValue(this.location, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/location/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
