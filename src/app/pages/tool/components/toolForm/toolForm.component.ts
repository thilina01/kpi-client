import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ToolService } from '../../tool.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'tool-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolForm.scss'],
    templateUrl: './toolForm.html',
})
export class ToolForm {

    JSON: any = JSON;

    tool: any = {};

    constructor(protected service: ToolService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(tool => { if (tool) this.tool = tool; });
        }
    }

    public save(tool: any): void {
        this.service.save(tool).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/tool/form/']);
            }
        );
    }
}
