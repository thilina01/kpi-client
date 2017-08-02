import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { BreakdownService } from '../../../../services/breakdown.service';
import { SharedService } from '../../../../services/shared.service';
import { MachineService } from '../../../../services/machine.service';

@Component({
    selector: 'breakdown-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./breakdownForm.scss'],
    templateUrl: './breakdownForm.html',
})
export class BreakdownForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    breakdown: any = {};
    subscription: Subscription;

    machines: any;

    breakdownDate: Date;
    breakdownTime: Date = new Date();
    recoveryTime: Date = new Date();
    machine: any = { id: '', code: '' }


    constructor(protected service: BreakdownService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService, private machineService: MachineService) {
        this.formGroup = fb.group({
            id: '',
            breakdownTime: [this.breakdownTime, Validators.required],
            recoveryTime: [this.recoveryTime, Validators.required],
            breakdownNumber: ['', Validators.required],
            machine: [this.machine, Validators.required],
            description: ['', Validators.required]
        });
    }

    getMachines(): void {
        this.machineService.getAll().then(machines => this.machines = machines);
    }

    ngOnInit(): void {
        this.getMachines();
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
            data.breakdownTime = new Date(data.breakdownTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.breakdown = data;
        }
        this.formGroup.patchValue(this.breakdown, { onlySelf: true });
        this.machine = this.breakdown.machine;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/breakdown/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }    
             /*================== MachineFilter ===================*/
    filteredMachines: any[];
    //machine: any;

    filterMachines(event) {
        let query = event.query.toLowerCase();
        this.filteredMachines = [];
        for (let i = 0; i < this.machines.length; i++) {
            let machine = this.machines[i];
            if (machine.code.toLowerCase().indexOf(query) == 0 || machine.name.toLowerCase().indexOf(query) == 0) {
                this.filteredMachines.push(machine);
            }
        }
    }

    handleMachineDropdownClick() {
        this.filteredMachines = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredMachines = this.machines;
        }, 100)
    }

    onMachineSelect(machine: any) {
        console.log(event)
    }
    /*================== End Of MachineFilter ===================*/
}



