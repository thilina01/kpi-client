import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { MachineService } from '../../machine.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'machine-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./machineForm.scss'],
    templateUrl: './machineForm.html',
})
export class MachineForm {
    JSON: any = JSON;

    machine: any = {};

    constructor(protected service: MachineService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(machine => { if (machine) this.machine = machine; });
        }
    }

    public save(machine: any): void {
        this.service.save(machine).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/machine/form/']);
            }
        );
    }
}
