import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ToolService } from '../../../../services/tool.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'tool-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolForm.scss'],
    templateUrl: './toolForm.html',
})
export class ToolForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    tool: any = {};
    subscription: Subscription;

    toolTypes: any;
    paints: any;

    toolDate: Date;
    toolTime: Date = new Date();
    recoveryTime: Date = new Date();
    toolType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: ToolService,
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
            data.toolTime = new Date(data.toolTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.tool = data;
        }
        this.formGroup.patchValue(this.tool, { onlySelf: true });
        this.toolType = this.tool.toolType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/tool/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
