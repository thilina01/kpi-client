import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { CountryService } from '../../../../services/country.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'country-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./countryForm.scss'],
    templateUrl: './countryForm.html',
})
export class CountryForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    country: any = {};
    subscription: Subscription;

    constructor(protected service: CountryService,
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
            data.countryTime = new Date(data.countryTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.country = data;
        }
        this.formGroup.patchValue(this.country, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/country/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
