import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { TeamService } from '../../team.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'team-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./teamForm.scss'],
    templateUrl: './teamForm.html',
})
export class TeamForm {

    JSON: any = JSON;

    team: any = {};

    constructor(protected service: TeamService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(team => { if (team) this.team = team; });
        }
    }

    public save(team: any): void {
        this.service.save(team).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/team/form/']);
            }
        );
    }
}

