import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { AbsenteeismService } from '../../../../services/absenteeism.service';
import { SharedService } from '../../../../services/shared.service';
import { LabourSourceService } from '../../../../services/labourSource.service';

@Component({
    selector: 'absenteeism-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./absenteeismForm.scss'],
    templateUrl: './absenteeismForm.html',
})
export class AbsenteeismForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    absenteeism: any = {};
    subscription: Subscription;

    labourSources: any;

    effectiveMonth: Date;
    labourSource: any = { id: '', code: '' }


    constructor(protected service: AbsenteeismService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService, private labourSourceService: LabourSourceService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            absenteeism: ['', Validators.required],
            target: ['', Validators.required],
            labourSource: [this.labourSource, Validators.required]
        });
    }

    getLabourSources(): void {
        this.labourSourceService.getAll().then(labourSources => this.labourSources = labourSources);
    }

    ngOnInit(): void {
        this.getLabourSources();
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
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.absenteeism = data;
        }
        this.formGroup.patchValue(this.absenteeism, { onlySelf: true });
        this.labourSource = this.absenteeism.labourSource;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/absenteeism/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }    
             /*================== Labour Source Filter ===================*/
    filteredLabourSources: any[];
    //labourSource: any;

    filterLabourSources(event) {
        let query = event.query.toLowerCase();
        this.filteredLabourSources = [];
        for (let i = 0; i < this.labourSources.length; i++) {
            let labourSource = this.labourSources[i];
            if (labourSource.code.toLowerCase().indexOf(query) == 0 || labourSource.name.toLowerCase().indexOf(query) == 0) {
                this.filteredLabourSources.push(labourSource);
            }
        }
    }

    handleLabourSourceDropdownClick() {
        this.filteredLabourSources = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredLabourSources = this.labourSources;
        }, 100)
    }

    onLabourSourceSelect(labourSource: any) {
        //console.log(event)
    }
    /*================== End Of Labour Source Filter ===================*/
}


