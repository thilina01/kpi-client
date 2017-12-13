import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { PaintService } from '../../paint.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'paint-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./paintForm.scss'],
    templateUrl: './paintForm.html',
})
export class PaintForm {

    JSON: any = JSON;

    paint: any = {};

    constructor(protected service: PaintService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(paint => { if (paint) this.paint = paint; });
        }
    }

    public save(paint: any): void {
        this.service.save(paint).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/paint/form/']);
            }
        );
    }
}
