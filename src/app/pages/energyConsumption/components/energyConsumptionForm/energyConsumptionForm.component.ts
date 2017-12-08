import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { EnergyConsumptionService } from '../../energyConsumption.service';
import { LocationService } from '../../../location/location.service';

@Component({
    selector: 'energy-consumption-form',
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

    constructor(protected service: EnergyConsumptionService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private locationService: LocationService) {
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
        this.locationService.getAll().subscribe(locations => this.locations = locations);
    }

    ngOnInit(): void {
        this.getLocations();
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

    refresh(): void {
        this.getLocations();

    }

    loadForm(data: any) {
        if (data != null) {
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.energyConsumption = data;
        }
        this.formGroup.patchValue(this.energyConsumption, { onlySelf: true });
        this.location = this.energyConsumption.location;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
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

    /*================== Location Filter ===================*/
    filteredLocations: any[];

    filterLocations(event) {
        let query = event.query.toLowerCase();
        this.filteredLocations = [];
        for (let i = 0; i < this.locations.length; i++) {
            let location = this.locations[i];
            if (location.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredLocations.push(location);
            }
        }
    }

    handleLocationDropdownClick() {
        this.filteredLocations = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredLocations = this.locations;
        }, 100)
    }

    onLocationSelect(event: any) {

    }
    /*================== End Of Location Filter ===================*/
}



