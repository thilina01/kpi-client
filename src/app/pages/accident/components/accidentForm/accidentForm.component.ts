import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { AccidentService } from "../../accident.service";
import { AccidentTypeService } from "../../../accidentType/accidentType.service";
import { DataTable, ConfirmationService } from "primeng/primeng";
import { EmployeeService } from '../../../employee/employee.service';
import { SectionService } from '../../../section/section.service';
import { ShiftService } from '../../../shift/shift.service';
import { MachineService } from '../../../machine/machine.service';
import { TreatmentTypeService } from '../../../treatmentType/treatmentType.service';

@Component({
    selector: 'accident-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accidentForm.scss'],
    templateUrl: './accidentForm.html',

})
export class AccidentForm {
    @Input('formGroup')
    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTable: DataTable;
    public treatmentFormGroup: FormGroup;
    public FormGroup: FormGroup;
    JSON: any = JSON;
    totalRecords = 0;
    treatmentType: any;
    accidentType: any;
    shift: any;
    machine: any;
    section: any;
    employee: any;
    accidentDate: Date = new Date();
    startTime: Date = new Date();
    endTime: Date = new Date();
    accident: any = {};
    subscription: Subscription;
    accidentTypeList = [];
    treatmentTypeList = [];
    responsiblePersonList = [];
    machineList = [];
    shiftList = [];
    sectionList = [];
    employeeList = [];

    constructor(protected service: AccidentService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private accidentTypeService: AccidentTypeService,
        private employeeService: EmployeeService,
        private sectionService: SectionService,
        private shiftService: ShiftService,
        private machineService: MachineService,
        private treatmentTypeService: TreatmentTypeService,
        private sharedService: SharedService) {

        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            accidentDate: [this.accidentDate, Validators.required],
            employee: [{}, Validators.compose([Validators.required])],
            section: [{}, Validators.compose([Validators.required])],
            shift: [{}, Validators.compose([Validators.required])],
            machine: [{}, Validators.compose([Validators.required])],
            accidentType: [{}, Validators.compose([Validators.required])],
            rootCause: ['', Validators.required],
            correctiveAction: ['', Validators.required],
            responsiblePerson: [{}],
            treatmentList: [[]],

        });

        this.treatmentFormGroup = fb.group({
            treatmentType: [{}, Validators.compose([Validators.required])],
            description: ['', Validators.required],
            startTime: [this.startTime, Validators.required],
            endTime: [this.endTime, Validators.required],
        });
    }

    getAccidentTypeList(): void {
        this.accidentTypeService.getCombo().subscribe(accidentTypeList => this.accidentTypeList = accidentTypeList);
    }
    getEmployeeList(): void {
        this.employeeService.getCombo().subscribe(employeeList => this.employeeList = employeeList);
    }
    getSectionList(): void {
        this.sectionService.getCombo().subscribe(sectionList => this.sectionList = sectionList);
    }
    getShiftList(): void {
        this.shiftService.getCombo().subscribe(shiftList => this.shiftList = shiftList);
    }
    getMachineList(): void {
        this.machineService.getCombo().subscribe(machineList => this.machineList = machineList);
    }
    getTreatmentTypeList(): void {
        this.treatmentTypeService.getCombo().subscribe(treatmentTypeList => this.treatmentTypeList = treatmentTypeList);
    }

    refresh(): void {
        this.getAccidentTypeList();
        this.getEmployeeList();
        this.getSectionList();
        this.getShiftList();
        this.getMachineList();
        this.getTreatmentTypeList();
    }

    fillTreatments(): void {

        this.formGroup.value.treatmentList = this.formGroup.value.treatmentList.slice();
        this.dataTable.reset();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.refresh();
        }, 500);
        this.getEmployeeList();
        this.getSectionList();
        this.getShiftList();
        this.getMachineList();
        this.getTreatmentTypeList();
        this.getAccidentTypeList();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).subscribe(
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
            data.accidentDate = new Date(data.accidentDate);
            data.startTime = new Date(data.startTime);
            data.endTime = new Date(data.endTime);
            this.accident = data;
        }
        this.formGroup.patchValue(this.accident, { onlySelf: true });
        this.accidentType = this.accident.accidentType;
        this.employee = this.accident.employee;
        this.section = this.accident.section;
        this.machine = this.accident.machine;
        this.treatmentType = this.accident.treatmentType;
        this.shift = this.accident.shift;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        if (values.treatmentList === null || values.treatmentList.length === 0) {
            alert('Items Required');
            return;
        }
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/accident/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
        this.treatmentFormGroup.reset();
    }

    public removeTreatment(id: number) {
        if (this.formGroup.value.treatmentList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.treatmentList.splice(id, 1);
                    this.fillTreatments();
                }
            });
        }
    }
    public onEnter(endTimes: string, dt: DataTable) {
        if (this.treatmentFormGroup.valid) {
            let values = this.treatmentFormGroup.value;
            if (this.formGroup.value.treatmentList == null) {
                this.formGroup.value.treatmentList = [];
            }
            this.formGroup.value.treatmentList.push(values);
            this.treatmentFormGroup.reset();
            document.getElementById('treatmentTypeSelector').focus();
            this.formGroup.value.treatmentList = this.formGroup.value.treatmentList.slice();
        }
        else {
            console.log(this.treatmentFormGroup.errors);

        }
    }
    /*================== Accident Type Filter ===================*/
    filteredAccidentTypes: any[];

    filterAccidentTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredAccidentTypes = [];
        for (let i = 0; i < this.accidentTypeList.length; i++) {
            let accidentType = this.accidentTypeList[i];
            if (accidentType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredAccidentTypes.push(accidentType);
            }
        }
    }

    onAccidentTypeSelect(event: any) {

    }

    /*================== End Of Accident Type Filter ===================*/
    /*================== Treatment Type Filter ===================*/
    filteredTreatmentTypes: any[];

    filterTreatmentTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredTreatmentTypes = [];
        for (let i = 0; i < this.treatmentTypeList.length; i++) {
            let treatmentType = this.treatmentTypeList[i];
            if (treatmentType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredTreatmentTypes.push(treatmentType);
            }
        }
    }

    onTreatmentTypeSelect(event: any) {

    }
    /*================== End Of Treatment Type Filter ===================*/
    /*================== EmployeeFilter ===================*/
    filteredEmployeeList: any[];

    filterEmployeeList(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployeeList = [];
        for (let i = 0; i < this.employeeList.length; i++) {
            let employee = this.employeeList[i];
            if (employee.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredEmployeeList.push(employee);
            }
        }
    }

    onEmployeeSelect(event: any) {

    }

    /*================== End Of Employee Filter ===================*/
    /*================== Shift Filter ===================*/
    filteredShiftList: any[];

    filterShiftList(event) {
        let query = event.query.toLowerCase();
        this.filteredShiftList = [];
        for (let i = 0; i < this.shiftList.length; i++) {
            let shift = this.shiftList[i];
            if (shift.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredShiftList.push(shift);
            }
        }
    }

    onShiftSelect(event: any) {
    }


    /*================== End Of Shift Filter ===================*/
    /*================== Machine Filter ===================*/
    filteredMachineList: any[];
    //machine: any;

    filterMachineList(event) {
        let query = event.query.toLowerCase();
        this.filteredMachineList = [];
        for (let i = 0; i < this.machineList.length; i++) {
            let machine = this.machineList[i];
            if (machine.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredMachineList.push(machine);
            }
        }
    }

    onMachineSelect(event: any) {
    }
    /*================== End Of Machine Filter ===================*/
    /*================== Section Filter ===================*/
    filteredSectionList: any[];

    filterSectionList(event) {
        let query = event.query.toLowerCase();
        this.filteredSectionList = [];
        for (let i = 0; i < this.sectionList.length; i++) {
            let section = this.sectionList[i];
            if (section.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSectionList.push(section);
            }
        }
    }

    onSectionSelect(event: any) {
    }

}




