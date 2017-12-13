import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LocationService } from '../../location.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'location-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./locationForm.scss'],
    templateUrl: './locationForm.html',
})
export class LocationForm {
    JSON: any = JSON;

    location: any = {};

    constructor(protected service: LocationService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(location => { if (location) this.location = location; });
        }
    }

    public save(location: any): void {
        this.service.save(location).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/location/form/']);
            }
        );
    }
}
