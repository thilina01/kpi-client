import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { UserService } from '../../user.service';

@Component({
    selector: 'user-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./userForm.scss'],
    templateUrl: './userForm.html',
})
export class UserForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    user: any = {};
    subscription: Subscription;

    teams: any;
    statuses: any;
    team: any = { id: '', name: '' }
    status: any = { id: '', name: '' }

    constructor(protected service: UserService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            email: ['', Validators.email],
            password: ['', Validators.required],
            repeat_password: ['', Validators.required]
        }, { validator: this.matchingPasswords('password', 'repeat_password') });
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
        }
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
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
            this.user = data;
        }
        this.formGroup.patchValue(this.user, { onlySelf: true });
        this.team = this.user.team;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/user/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
