import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ToolBreakdownService } from '../../toolBreakdown.service';
import { ToolService } from '../../../tool/tool.service';

@Component({
  selector: 'tool-breakdown-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./toolBreakdownTable.scss'],
  templateUrl: './toolBreakdownTable.html'
})
export class ToolBreakdownTable {
  toolBreakdown = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  startDate: Date;
  endDate: Date;
  pageSize = 20;
  tool: any = { id: 0, code: 'ALL', display: 'All tools' };
  filteredTools: any;
  tools: any;
  constructor(
    protected service: ToolBreakdownService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toolService: ToolService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getTools();
  }

  getTools(): void {
    this.toolService.getCombo().subscribe(tools => {
      this.tools = tools;
      this.tools.unshift({ id: 0, code: 'ALL', display: 'All Tools' });
    });
  }

  loadData() {
    this.service
      .getToolBreakdownPage(0, '1970-01-01', '2100-12-31', 0, 20)
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
      .getToolBreakdownPage(
        this.tool !== undefined ? this.tool.id : 0,
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

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {}

  onRowDblclick(data: any): void {
    window.open('/#/pages/toolBreakdown/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/toolBreakdown/form/' + id]);
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  /*================== Tool Filter ===================*/
  filterTools(event) {
    let query = event.query.toLowerCase();
    this.filteredTools = [];
    for (let i = 0; i < this.tools.length; i++) {
      let tool = this.tools[i];
      if (tool.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredTools.push(tool);
      }
    }
  }

  onToolSelect(tool: any) {
    console.log(event);
    this.tool = tool;
  }

  /*================== End Of Tool Filter ===================*/
}
