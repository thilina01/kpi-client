import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { EnergyConsumptionService } from '../../../../services/energyConsumption.service';
import { SharedService } from '../../../../services/shared.service';
import { LocationService } from '../../../../services/location.service';

@Component({
    selector: 'energyConsumption-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./energyConsumptionForm.scss'],
    templateUrl: './energyConsumptionForm.html',
})
export class EnergyConsumptionForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    energyConsumption: any = {};
    subscription: Subscription;

    locations: any;

    effectiveMonth: Date;
    location: any = { id: '', code: '' }


    constructor(protected service: EnergyConsumptionService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService, private locationService: LocationService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            kwh: ['', Validators.required],
            kva: ['', Validators.required],
            cost: ['', Validators.required],
            reference: ['', Validators.required],
            location: [this.location, Validators.required]
        });
    }

    getLocations(): void {
        this.locationService.getAll().then(locations => this.locations = locations);
    }

    ngOnInit(): void {
        this.getLocations();
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
            data.energyConsumptionTime = new Date(data.energyConsumptionTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.energyConsumption = data;
        }
        this.formGroup.patchValue(this.energyConsumption, { onlySelf: true });
        this.location = this.energyConsumption.location;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/energyConsumption/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
