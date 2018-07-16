import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { ScrapService } from '../../scrap.service';
import { SectionService } from '../../../section/section.service';

@Component({
  selector: 'scrap-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./scrapTable.scss'],
  templateUrl: './scrapTable.html'
})
export class ScrapTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  startDate: Date;
  endDate: Date;
  sections: any;
  section: any = { id: 0, code: 'ALL', display: 'All Sections' };
  pageSize = 20;

  constructor(
    protected service: ScrapService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getSections();
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, code: 'ALL', display: 'All Sections' });
    });
  }

  loadData() {
    this.service
      .getSectionAndScrapDateBetweenPage(0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSectionAndScrapDateBetweenPage(
        this.section !== undefined ? this.section.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/scrap/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/scrap/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({
            severity: 'info',
            summary: 'Deleted',
            detail: 'Delete success'
          });
          this.loadData();
        });
      }
    });
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
    console.log(event);
  }
  /*================== End Of Section Filter ===================*/
}
