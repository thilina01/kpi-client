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
    treatmentType: Array<any>;
    accidentType: any;
    shift: any;
    machine: any;
    section: any;
    employee: any;
    accidentDate: Date = new Date();
    startTime: Date = new Date();
    endTime: Date = new Date();
    totalRecords = 0;

    JSON: any = JSON;

    public FormGroup: FormGroup;
    accident: any = {};
    subscription: Subscription;

    accidentTypeList = [];
    treatmentTypeList = [];
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
            lossManHours: 0,
            code: ['', Validators.required],
            referenceNo: ['', Validators.required],
            accidentDate: [this.accidentDate, Validators.required],
            employee: [{}, Validators.compose([Validators.required])],
            section: [{}, Validators.compose([Validators.required])],
            shift: [{}, Validators.compose([Validators.required])],
            machine: [{}, Validators.compose([Validators.required])],
            accidentType: [{}, Validators.compose([Validators.required])],
            rootCause: ['', Validators.required],
            correctiveAction: ['', Validators.required],
            responsiblePerson: ['', Validators.required],
            treatmentList: [[]],

        });

        this.treatmentFormGroup = fb.group({
            treatmentType: [{}, Validators.compose([Validators.required])],
            description: ['', Validators.required],
            startTime: [this.startTime, Validators.required],
            endTime: [this.endTime, Validators.required],
            lossManHours: ['', Validators.required]
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
        this.setDisplayOfAccidentType();
        this.setDisplayOfTreatmentType();
        this.setDisplayOfEmployee();
        this.setDisplayOfShift();
        this.setDisplayOfMachine();
        this.setDisplayOfSection();
        this.calculateTotal();
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
                    this.calculateTotal();
                    this.fillTreatments();
                }
            });
        }
    }

    public onEnter(lossManHours: string, dt: DataTable) {
        if (this.treatmentFormGroup.valid) {
            let values = this.treatmentFormGroup.value;
            if (this.formGroup.value.treatmentList == null) {
                this.formGroup.value.treatmentList = [];
            }
            this.formGroup.value.treatmentList.push(values);
            this.treatmentFormGroup.reset();
            this.calculateTotal();
            document.getElementById('treatmentTypeSelector').focus();
            this.formGroup.value.treatmentList = this.formGroup.value.treatmentList.slice();
        }
        else {
            console.log(this.treatmentFormGroup.errors);

        }
    }

    calculateTotal() {
        let lossManHours = 0;
        for (let i = 0; i < this.formGroup.value.treatmentList.length; i++) {
            let treatment = this.formGroup.value.treatmentList[i];
            lossManHours += parseInt(treatment.lossManHours);
        }
        this.formGroup.value.lossManHours = lossManHours;
    }

    /*================== Accident Type Filter ===================*/
    filteredAccidentTypes: any[];

    filterAccidentTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredAccidentTypes = [];
        for (let i = 0; i < this.accidentTypeList.length; i++) {
            let accidentType = this.accidentTypeList[i];
            if ((accidentType.code != null && accidentType.code.toLowerCase().indexOf(query) == 0) || (accidentType.name != null && accidentType.name.toLowerCase().indexOf(query) == 0)) {
                this.filteredAccidentTypes.push(accidentType);
            }
        }
    }

    handleAccidentTypeDropdownClick() {
        this.filteredAccidentTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredAccidentTypes = this.accidentTypeList;
        }, 100)
    }

    onAccidentTypeSelect(event: any) {

        this.setDisplayOfAccidentType();
    }

    setDisplayOfAccidentType() {
        let accidentType = this.formGroup.value.accidentType;
        if (accidentType != null && accidentType != undefined) {
            let display = accidentType.code != null && accidentType.code != undefined ? accidentType.code + " : " : "";
            display += accidentType.name != null && accidentType.name != undefined ? accidentType.name : "";
            this.formGroup.value.accidentType.display = display;
        }
    }
    /*================== End Of Accident Type Filter ===================*/
    /*================== Treatment Type Filter ===================*/
    filteredTreatmentTypes: any[];

    filterTreatmentTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredTreatmentTypes = [];
        for (let i = 0; i < this.treatmentTypeList.length; i++) {
            let treatmentType = this.treatmentTypeList[i];
            if ((treatmentType.code != null && treatmentType.code.toLowerCase().indexOf(query) == 0) || (treatmentType.name != null && treatmentType.name.toLowerCase().indexOf(query) == 0)) {
                this.filteredTreatmentTypes.push(treatmentType);
            }
        }
    }

    handleTreatmentTypeDropdownClick() {
        this.filteredTreatmentTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredTreatmentTypes = this.treatmentTypeList;
        }, 100)
    }

    onTreatmentTypeSelect(event: any) {

        this.setDisplayOfTreatmentType();
    }

    setDisplayOfTreatmentType() {
        let treatmentType = this.treatmentFormGroup.value.treatmentType;
        if (treatmentType != null && treatmentType != undefined) {
            let display = treatmentType.code != null && treatmentType.code != undefined ? treatmentType.code + " : " : "";
            display += treatmentType.name != null && treatmentType.name != undefined ? treatmentType.name : "";
            this.treatmentFormGroup.value.treatmentType.display = display;
        }
    }
    /*================== End Of Treatment Type Filter ===================*/
    /*================== EmployeeFilter ===================*/
    filteredEmployeeList: any[];

    filterEmployeeList(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployeeList = [];
        for (let i = 0; i < this.employeeList.length; i++) {
            let employee = this.employeeList[i];
            if (employee.code.toLowerCase().indexOf(query) == 0 || employee.firstName.toLowerCase().indexOf(query) == 0) {
                this.filteredEmployeeList.push(employee);
            }
        }
    }

    handleEmployeeDropdownClick() {
        this.filteredEmployeeList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredEmployeeList = this.employeeList;
        }, 100)
    }

    onEmployeeSelect(event: any) {
        this.setDisplayOfEmployee();
    }

    setDisplayOfEmployee() {
        let employee = this.formGroup.value.employee;
        if (employee != null && employee != undefined) {
            let display = employee.code != null && employee.code != undefined ? employee.code + " : " : "";
            display += employee.fullName != null && employee.fullName != undefined ? employee.fullName : "";
            this.formGroup.value.employee.display = display;
        }
    }
    /*================== End Of Employee Filter ===================*/
    /*================== Shift Filter ===================*/
    filteredShiftList: any[];

    filterShiftList(event) {
        let query = event.query.toLowerCase();
        this.filteredShiftList = [];
        for (let i = 0; i < this.shiftList.length; i++) {
            let shift = this.shiftList[i];
            if (shift.code.toLowerCase().indexOf(query) == 0 || shift.firstName.toLowerCase().indexOf(query) == 0) {
                this.filteredShiftList.push(shift);
            }
        }
    }

    handleShiftDropdownClick() {
        this.filteredShiftList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredShiftList = this.shiftList;
        }, 100)
    }

    onShiftSelect(event: any) {
        this.setDisplayOfShift();
    }

    setDisplayOfShift() {
        let shift = this.formGroup.value.shift;
        if (shift != null && shift != undefined) {
            let display = shift.code != null && shift.code != undefined ? shift.code + " : " : "";
            display += shift.name != null && shift.name != undefined ? shift.name : "";
            this.formGroup.value.shift.display = display;
        }
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
            if (machine.code.toLowerCase().indexOf(query) == 0 || machine.firstName.toLowerCase().indexOf(query) == 0) {
                this.filteredMachineList.push(machine);
            }
        }
    }

    handleMachineDropdownClick() {
        this.filteredMachineList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredMachineList = this.machineList;
        }, 100)
    }

    onMachineSelect(event: any) {
        this.setDisplayOfMachine();
    }

    setDisplayOfMachine() {
        let machine = this.formGroup.value.machine;
        if (machine != null && machine != undefined) {
            let display = machine.code != null && machine.code != undefined ? machine.code + " : " : "";
            display += machine.name != null && machine.name != undefined ? machine.name : "";
            this.formGroup.value.machine.display = display;
        }
    }
    /*================== End Of Machine Filter ===================*/
    /*================== Section Filter ===================*/
    filteredSectionList: any[];

    filterSectionList(event) {
        let query = event.query.toLowerCase();
        this.filteredSectionList = [];
        for (let i = 0; i < this.sectionList.length; i++) {
            let section = this.sectionList[i];
            if (section.code.toLowerCase().indexOf(query) == 0 || section.firstName.toLowerCase().indexOf(query) == 0) {
                this.filteredSectionList.push(section);
            }
        }
    }

    handleSectionDropdownClick() {
        this.filteredSectionList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSectionList = this.sectionList;
        }, 100)
    }

    onSectionSelect(event: any) {
        this.setDisplayOfSection();
    }

    setDisplayOfSection() {
        let section = this.formGroup.value.section;
        if (section != null && section != undefined) {
            let display = section.code != null && section.code != undefined ? section.code + " : " : "";
            display += section.name != null && section.name != undefined ? section.name : "";
            this.formGroup.value.section.display = display;
        }
    }

}




