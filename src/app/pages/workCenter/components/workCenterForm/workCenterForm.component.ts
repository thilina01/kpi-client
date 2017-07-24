import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { WorkCenterService } from '../../../../services/workCenter.service';
import { SharedService } from '../../../../services/shared.service';
import { CostCenterService } from '../../../../services/costCenter.service';

@Component({
    selector: 'work-center-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./workCenterForm.scss'],
    templateUrl: './workCenterForm.html',
})
export class WorkCenterForm {
    

    costCenters: any;
    
    costCenter: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    workCenter: any = {};
    subscription: Subscription;

    workCenterTypes: any;
    paints: any;
    

    workCenterDate: Date;
    workCenterTime: Date = new Date();
    recoveryTime: Date = new Date();
    workCenterType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }
     
    


    constructor(protected service: WorkCenterService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private costCenterService:CostCenterService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            costCenter: [this. costCenter, Validators.required]
            
            
        });
    }

 getCostCenters(): void {
        this.costCenterService.getCombo().then(costCenters => this.costCenters = costCenters);
    }

    
    ngOnInit(): void {
        this. getCostCenters();
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
            data.workCenterTime = new Date(data.workCenterTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.workCenter = data;
        }
        this.formGroup.patchValue(this.workCenter, { onlySelf: true });
        this.workCenterType = this.workCenter.workCenterType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/workCenter/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
