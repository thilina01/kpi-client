
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ConfirmationService, Message } from 'primeng/primeng';
import { AccidentService } from "../../accident.service";
import { SectionService } from '../../../section/section.service';

@Component({
    selector: 'accident-table',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accidentTable.scss'],
    templateUrl: './accidentTable.html',
})
export class AccidentTable {
    accident = {};
    rows = [];
    timeout: any;
    totalRecords: number;
    sections: any;
    @ViewChild(DataTable) dataTable: DataTable;
    section: any = { id: 0, 'code': 'ALL', 'display': 'All Sections' }
    startDate: Date;
    endDate: Date;
    constructor(protected service: AccidentService,
        private router: Router,
        private sectionService: SectionService,
        private confirmationService: ConfirmationService,
        protected sharedService: SharedService) {
        this.loadData();
        this.getSections();

    }
    getSections(): void {
        this.sectionService.getCombo().subscribe(sections => {
            this.sections = sections;
            this.sections.unshift({ id: 0, 'code': 'ALL', 'display': 'All Sections' });
        });
    }
    loadData() {
        this.service.getPage(0, 20).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }

    lazy(event: any, table: any) {
        console.log(event);
        this.search((event.first / event.rows), event.rows);
    }
    search(first: number, pageSize: number): void {
        if (this.startDate != undefined &&
            this.endDate != undefined &&
            this.section != undefined &&
            this.section.id != undefined) {
            if (this.section.id == 0) {
                this.service.getByAccidentDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
                    this.fillTable(data);
                });
            } else if (this.section.id > 0) {
                this.service.getBySectionAndAccidentDurationPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
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

    selected(data: any) {
    }

    onRowDblclick(data: any): void {
        this.router.navigate(['/pages/accident/form/' + data.id]);
    }

    navigateToForm(id: any): void {
        this.router.navigate(['/pages/accident/form/' + id]);
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

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.search(event.first, event.rows);
        }, 100);
    }
    /*================== Section Filter ===================*/
    filteredSections: any[];
    filterSections(event) {
        let query = event.query.toLowerCase();
        this.filteredSections = [];
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSections.push(section);
            }
        }
    }
    onSectionSelect(section: any) {
        console.log(event)
    }
    /*================== End Of Section Filter ===================*/
}
