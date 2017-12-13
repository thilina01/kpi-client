import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

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

    containerSize: any = {};

    constructor(protected service: ContainerSizeService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(containerSize => { if (containerSize) this.containerSize = containerSize; });
        }
    }

    public save(containerSize: any): void {
        this.service.save(containerSize).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/containerSize/form/']);
            }
        );
    }
}
