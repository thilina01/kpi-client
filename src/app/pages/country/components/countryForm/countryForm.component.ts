import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import {  AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CountryService } from '../../country.service';

@Component({
    selector: 'country-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./countryForm.scss'],
    templateUrl: './countryForm.html',
})
export class CountryForm {
    JSON: any = JSON;

    country: any = {};

    constructor(protected service: CountryService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.service.get(+id).subscribe(country => { if (country) this.country = country; } );
        }
    }

    public save(country: any): void {
        this.service.save(country).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/country/form/']);
            }
        );
    }
}
