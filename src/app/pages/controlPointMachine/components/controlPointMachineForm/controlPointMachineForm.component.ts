import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ControlPointMachineService } from '../../../../services/controlPointMachine.service';
import { SharedService } from '../../../../services/shared.service';
import { ControlPointService } from '../../../../services/controlPoint.service';
import { MachineService } from '../../../../services/machine.service';

@Component({
    selector: 'control-point-machine-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./controlPointMachineForm.scss'],
    templateUrl: './controlPointMachineForm.html',
})
export class ControlPointMachineForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    controlPointMachine: any = {};
    subscription: Subscription;

    controlPoints: any;
    controlPoint: any = { id: '', code: '', name: '' }
    machines: any;
    machine: any = { id: '', code: '', name: '' }


    constructor(protected service: ControlPointMachineService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private controlPointService: ControlPointService,
        private machineService: MachineService) {
        this.formGroup = fb.group({
            id: '',
            controlPoint: [this.controlPoint, Validators.required],
            machine: [this.machine, Validators.required]
        });
    }

    getControlPoints(): void {
        this.controlPointService.getCombo().then(controlPoints => this.controlPoints = controlPoints);
    }

    getMachines(): void {
        this.machineService.getCombo().then(machines => this.machines = machines);
    }

    ngOnInit(): void {
        this.getControlPoints();
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
            this.controlPointMachine = data;
        }
        this.formGroup.patchValue(this.controlPointMachine, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/controlPointMachine/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
 /*================== Control Point Filter ===================*/
    filteredControlPoints: any[];
    //controlPoint: any;

    filterControlPoints(event) {
        let query = event.query.toLowerCase();
        this.filteredControlPoints = [];
        for (let i = 0; i < this.controlPoints.length; i++) {
            let controlPoint = this.controlPoints[i];
            if (controlPoint.code.toLowerCase().indexOf(query) == 0 || controlPoint.name.toLowerCase().indexOf(query) == 0) {
                this.filteredControlPoints.push(controlPoint);
            }
        }
    }

    handleControlPointDropdownClick() {
        this.filteredControlPoints = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredControlPoints = this.controlPoints;
        }, 100)
    }

    onControlPointSelect(controlPoint: any) {
        console.log(event)
    }
    /*================== End Of Control Point Filter ===================*/
    /*================== Machine Filter ===================*/
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
    /*================== End Of Machine Filter ===================*/
}
