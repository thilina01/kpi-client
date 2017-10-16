import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';

import 'style-loader!./register.scss';
import { AuthService } from "../../services/auth.service";
import { SharedService } from "../../services/shared.service";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;

  constructor(fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private sharedService: SharedService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  ngOnInit() {
    this.authService.logout();
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      values.password = values.passwords.password;
      this.authService.addUser(values).then((res: any) => {
        if (res.success) {
          this.userService.save(values).subscribe(
            data => {
              this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Wait for the activation confirmation mail.' });
              this.form.reset();
              this.router.navigate(['/login']);
            }
          );
        }
        else
          alert('Error' + res);
      })
    }
  }
}
