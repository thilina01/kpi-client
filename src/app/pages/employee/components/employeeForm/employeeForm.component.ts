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
            if (section.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSections.push(section);

            }
        }
    }
    onSectionSelect(event: any) {
    }
    /*================== End Of Section Filter ===================*/
    /*================== Shift Filter ===================*/
    filteredShifts: any[];

    filterShift(event) {
        let query = event.query.toLowerCase();
        this.filteredShifts = [];
        for (let i = 0; i < this.shifts.length; i++) {
            let shift = this.shifts[i];
            if (shift.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredShifts.push(shift);

            }
        }
    }
    onShiftSelect(event: any) {
    }
    /*================== End Of Shift Filter ===================*/
    /*================== Designation Filter ===================*/
    filteredDesignations: any[];

    filterDesignation(event) {
        let query = event.query.toLowerCase();
        this.filteredDesignations = [];
        for (let i = 0; i < this.designations.length; i++) {
            let designation = this.designations[i];
            if (designation.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredDesignations.push(designation);

            }
        }
    }

    onDesignationSelect(event: any) {
    }
    /*================== End Of Designation Filter ===================*/
    /*================== EmployeeCategory Filter ===================*/
    filteredEmployeeCategorys: any[];

    filterEmployeeCategory(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployeeCategorys = [];
        for (let i = 0; i < this.employeeCategorys.length; i++) {
            let employeeCategory = this.employeeCategorys[i];
            if (employeeCategory.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredEmployeeCategorys.push(employeeCategory);

            }
        }
    }

    onEmployeeCategorySelect(event: any) {
    }
    /*================== End Of EmployeeCategory Filter ===================*/
    /*================== LabourSource Filter ===================*/
    filteredLabourSources: any[];

    filterLabourSource(event) {
        let query = event.query.toLowerCase();
        this.filteredLabourSources = [];
        for (let i = 0; i < this.labourSources.length; i++) {
            let labourSource = this.labourSources[i];
            if (labourSource.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredLabourSources.push(labourSource);

            }
        }
    }

    onLabourSourceSelect(event: any) {
    }

    /*================== End Of LabourSource Filter ===================*/
}




