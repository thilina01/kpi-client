import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router'
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CodeNameService } from '../../codeName.service';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';

@Component({
    selector: 'code-name-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./codeNameForm.scss'],
    templateUrl: './codeNameForm.html',
})
export class CodeNameForm {
    JSON: any = JSON;
    title: string = '';
    codeName: any = {};
    subscription: Subscription;

    constructor(protected service: CodeNameService,
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router) {
        this.subscription = router.events.filter((evt) => evt instanceof NavigationEnd).subscribe((evt) => {
            this.loadData();
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    loadData() {
        this.title = _.startCase(pluralize.singular(this.service.endPoint));
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(codeName => { if (codeName) this.codeName = codeName; });
        }
    }

    // ngOnInit(): void {
    // }

    public save(codeName: any): void {
        this.service.save(codeName).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/' + this.service.endPoint + '/form/']);
            }
        );
    }
}
