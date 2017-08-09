import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';



import { SharedService } from '../../../../services/shared.service';
import { JobTypeService } from "../../jobType.service";

@Component({
    selector: 'job-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobTypeForm.scss'],
    templateUrl: './jobTypeForm.html',
})
export class JobTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    subscription: Subscription;

    jobTypeList: any;
    jobType: any = { id: '', code: '', name: '' };


    constructor(protected service: JobTypeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required]
        });
    }


    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).then(
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
            this.jobType = data;
        }
        this.formGroup.patchValue(this.jobType, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/jobType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
