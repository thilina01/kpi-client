import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { EmployeeService } from '../../employee.service';
import { SectionService } from '../../../section/section.service';
import { LabourSourceService } from '../../../labourSource/labourSource.service';
import { ShiftService } from '../../../shift/shift.service';
import { EmployeeCategoryService } from '../../../employeeCategory/employeeCategory.service';
import { DesignationService } from '../../../designation/designation.service';

@Component({
    selector: 'employee-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./employeeForm.scss'],
    templateUrl: './employeeForm.html',
})
export class EmployeeForm {
    public formGroup: FormGroup;
    subscription: Subscription;
    employee: any = {};
    JSON: any = JSON;

    labourSources: any;
    employeeCategorys: any;
    designations: any;
    shifts: any;
    sections: any;
    labourSource: any;
    section: any;
    shift: any;
    employeeCategory: any;
    designation: any;
    dateOfBirth: Date;

    constructor(protected service: EmployeeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sectionService: SectionService,
        private labourSourceService: LabourSourceService,
        private shiftService: ShiftService,
        private employeeCategoryService: EmployeeCategoryService,
        private designationService: DesignationService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            callingName: '',
            contactNumber: '',
            fullName: ['', Validators.required],
            dateOfBirth: [this.dateOfBirth, Validators.required],
            nic: ['', Validators.required],
            code: ['', Validators.required],
            designation: [this.designation, Validators.required],
            employeeCategory: [this.employeeCategory, Validators.required],
            shift: [this.shift, Validators.required],
            section: [this.section, Validators.required],
            labourSource: [this.labourSource, Validators.required],
        });

    }
    getSections(): void {
        this.sectionService.getCombo().subscribe(sections => this.sections = sections);
    }

    getShifts(): void {
        this.shiftService.getCombo().subscribe(shifts => this.shifts = shifts);
    }
    getDesignations(): void {
        this.designationService.getCombo().subscribe(designations => this.designations = designations);
    }
    getEmployeeCategorys(): void {
        this.employeeCategoryService.getCombo().subscribe(employeeCategorys => this.employeeCategorys = employeeCategorys);
    }
    getLabourSources(): void {
        this.labourSourceService.getCombo().subscribe(labourSources => this.labourSources = labourSources);
    }

    ngOnInit(): void {
        this.getSections();
        this.getShifts();
        this.getDesignations();
        this.getEmployeeCategorys();
        this.getLabourSources();
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
            data.dateOfBirth = new Date(data.dateOfBirth);
            this.employee = data;
        }
        this.formGroup.patchValue(this.employee, { onlySelf: true });
        this.section = this.employee.section;
        this.shift = this.employee.shift;
        this.labourSource = this.employee.labourSource;
        this.employeeCategory = this.employee.employeeCategory;
        this.designation = this.employee.designation;
        this.setDisplayOfSection();
        this.setDisplayOfShift();
        this.setDisplayOfEmployeeCategory();
        this.setDisplayOfLabourSource();
        this.setDisplayOfDesignation();
    }

    refresh(): void {
        this.getSections();
        this.getShifts();
        this.getDesignations();
        this.getEmployeeCategorys();
        this.getLabourSources();
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/employee/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
    /*================== Section Filter ===================*/
    filteredSections: any[];

    filterSection(event) {
        let query = event.query.toLowerCase();
        this.filteredSections = [];
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.code.toLowerCase().indexOf(query) == 0 || section.name.toLowerCase().indexOf(query) == 0) {
                this.filteredSections.push(section);
            }
        }
    }

    handleSectionDropdownClick() {
        this.filteredSections = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSections = this.sections;
        }, 100)
    }

    onSectionSelect(event: any) {
        this.setDisplayOfSection();
    }

    setDisplayOfSection() {

        let section = this.formGroup.value.section;
        if (section != null && section != undefined) {
            let display = section.code != null && section.code != undefined ? section.code + ' : ' : '';
            display += section.name != null && section.name != undefined ? section.name : '';
            this.formGroup.value.section.display = display;
        }

    }
    /*================== End Of Section Filter ===================*/
    /*================== Shift Filter ===================*/
    filteredShifts: any[];

    filterShift(event) {
        let query = event.query.toLowerCase();
        this.filteredShifts = [];
        for (let i = 0; i < this.shifts.length; i++) {
            let shift = this.shifts[i];
            if (shift.code.toLowerCase().indexOf(query) == 0 || shift.name.toLowerCase().indexOf(query) == 0) {
                this.filteredShifts.push(shift);
            }
        }
    }

    handleShiftDropdownClick() {
        this.filteredShifts = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredShifts = this.shifts;
        }, 100)
    }

    onShiftSelect(event: any) {
        this.setDisplayOfShift();
    }

    setDisplayOfShift() {

        let shift = this.formGroup.value.shift;
        if (shift != null && shift != undefined) {
            let display = shift.code != null && shift.code != undefined ? shift.code + ' : ' : '';
            display += shift.name != null && shift.name != undefined ? shift.name : '';
            this.formGroup.value.shift.display = display;
        }

    }
    /*================== End Of Shift Filter ===================*/
    /*================== Designation Filter ===================*/
    filteredDesignations: any[];

    filterDesignation(event) {
        let query = event.query.toLowerCase();
        this.filteredDesignations = [];
        for (let i = 0; i < this.designations.length; i++) {
            let designation = this.designations[i];
            if (designation.code.toLowerCase().indexOf(query) == 0 || designation.name.toLowerCase().indexOf(query) == 0) {
                this.filteredDesignations.push(designation);
            }
        }
    }

    handleDesignationDropdownClick() {
        this.filteredDesignations = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredDesignations = this.designations;
        }, 100)
    }

    onDesignationSelect(event: any) {
        this.setDisplayOfDesignation();
    }

    setDisplayOfDesignation() {

        let designation = this.formGroup.value.designation;
        if (designation != null && designation != undefined) {
            let display = designation.code != null && designation.code != undefined ? designation.code + ' : ' : '';
            display += designation.name != null && designation.name != undefined ? designation.name : '';
            this.formGroup.value.designation.display = display;
        }

    }
    /*================== End Of Designation Filter ===================*/
    /*================== EmployeeCategory Filter ===================*/
    filteredEmployeeCategorys: any[];

    filterEmployeeCategory(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployeeCategorys = [];
        for (let i = 0; i < this.employeeCategorys.length; i++) {
            let employeeCategory = this.employeeCategorys[i];
            if (employeeCategory.code.toLowerCase().indexOf(query) == 0 || employeeCategory.name.toLowerCase().indexOf(query) == 0) {
                this.filteredEmployeeCategorys.push(employeeCategory);
            }
        }
    }

    handleEmployeeCategoryDropdownClick() {
        this.filteredEmployeeCategorys = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredEmployeeCategorys = this.employeeCategorys;
        }, 100)
    }

    onEmployeeCategorySelect(event: any) {
        this.setDisplayOfEmployeeCategory();
    }

    setDisplayOfEmployeeCategory() {

        let employeeCategory = this.formGroup.value.employeeCategory;
        if (employeeCategory != null && employeeCategory != undefined) {
            let display = employeeCategory.code != null && employeeCategory.code != undefined ? employeeCategory.code + ' : ' : '';
            display += employeeCategory.name != null && employeeCategory.name != undefined ? employeeCategory.name : '';
            this.formGroup.value.employeeCategory.display = display;
        }

    }
    /*================== End Of EmployeeCategory Filter ===================*/
    /*================== LabourSource Filter ===================*/
    filteredLabourSources: any[];

    filterLabourSource(event) {
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

    onLabourSourceSelect(event: any) {
        this.setDisplayOfLabourSource();
    }

    setDisplayOfLabourSource() {

        let labourSource = this.formGroup.value.labourSource;
        if (labourSource != null && labourSource != undefined) {
            let display = labourSource.code != null && labourSource.code != undefined ? labourSource.code + ' : ' : '';
            display += labourSource.name != null && labourSource.name != undefined ? labourSource.name : '';
            this.formGroup.value.labourSource.display = display;
        }

    }
    /*================== End Of LabourSource Filter ===================*/
}




