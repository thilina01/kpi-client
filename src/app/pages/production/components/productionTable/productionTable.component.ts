
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ProductionService } from "../../production.service";
import { DataTable } from "primeng/components/datatable/datatable";
import { Observable } from "rxjs/Rx";
import { SectionService } from '../../../section/section.service';
import { ShiftService } from '../../../shift/shift.service';

@Component({
    selector: 'production-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productionTable.scss'],
    templateUrl: './productionTable.html',
})
export class ProductionTable {
    @ViewChild(DataTable) dataTable: DataTable;
    totalRecords: number;
    production = {};
    rows = [];
    timeout: any;
    sections: any;
    section: any = { id: 0, "code": "ALL", "name": "All Sections", "display": "All" }
    shifts: any;
    shift: any = { id: 0, "code": "ALL", "name": "All Shifts", "display": "All" }
    startDate: Date;
    endDate: Date;
    //msgs: Message[];
    columns = [
        { prop: 'id', name: 'ID' },
        { prop: 'code', name: 'Code' },
        { prop: 'description', name: 'Description' },
        { prop: 'productionType.name', name: 'Type' }
    ];

    constructor(protected service: ProductionService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private sectionService: SectionService,
        private shiftService: ShiftService,
        private sharedService: SharedService) {
        this.loadData();
        this.getSections();
        this.getShifts();
    }

    getSections(): void {
        this.sectionService.getCombo().subscribe(sections => {
            this.sections = sections;
            this.sections.unshift({ id: 0, "code": "ALL", "name": "All Sections", "display": "All Sections" });
        });
    }
    getShifts(): void {
        this.shiftService.getCombo().subscribe(shifts => {
            this.shifts = shifts;
            this.shifts.unshift({ id: 0, "code": "ALL", "name": "All Shifts", "display": "All Shifts" });
        });
    }

    loadData() {
        this.service.getPage(0, 20).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    search(first: number, pageSize: number): void {
        if (this.startDate != undefined &&
            this.endDate != undefined &&
            this.section != undefined &&
            this.section.id != undefined &&
            this.shift != undefined &&
            this.shift.id != undefined) {
            if (this.section.id == 0 && this.shift.id == 0) {
                this.service.getByProductionDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else if (this.section.id == 0 && this.shift.id > 0) {
                this.service.getByProductionDurationAndShiftPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });

            } else if (this.section.id > 0 && this.shift.id == 0) {
                this.service.getBySectionAndProductionDurationPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else {
                this.service.getBySectionAndProductionDurationAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            }
        } else {
            this.service.getPage(first, pageSize).subscribe((data: any) => {
                this.fillTable(data);
            });
        }
    }

    fillTable(data: any) {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
    }

    onRowDblclick(data: any): void {
        this.router.navigate(['/pages/production/form/' + data.id]);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to Delete?',
            accept: () => {
                this.service.delete(id).subscribe(response => {
                    this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
                    this.loadData()
                }
                );
            }
        });
    }

    lazy(event: any, table: any) {
        console.log(event);
        this.search((event.first / event.rows), event.rows);
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
    navigateToForm(id: any): void {
        this.router.navigate(['/pages/plan']);
    }
    /*================== Shift Filter ===================*/
    filteredShifts: any;

    filterShifts(event) {
        let query = event.query.toLowerCase();
        this.filteredShifts = [];
        for (let i = 0; i < this.shifts.length; i++) {
            let shift = this.shifts[i];
            if (shift.code.toLowerCase().indexOf(query) == 0) {
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

    onShiftSelect(shift: any) {
        console.log(event)
    }
    /*================== End Of Shift Filter ===================*/
    /*================== Section Filter ===================*/

    filteredSections: any[];

    filterSections(event) {
        let query = event.query.toLowerCase();
        this.filteredSections = [];
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.code.toLowerCase().indexOf(query) == 0) {
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

    onSectionSelect(section: any) {
        console.log(event)
    }
    /*================== End Of Section Filter ===================*/
}

