import {SharedService} from '../../../../services/shared.service';
import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ConfirmationService} from 'primeng/primeng';
import {Router} from '@angular/router';
import {DataTable} from 'primeng/components/datatable/datatable';
import {SectionService} from '../../../section/section.service';
import {OperationService} from '../../operation.service';
import {ShiftService} from '../../../shift/shift.service';

@Component({
  selector: 'operation-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationTable.scss'],
  templateUrl: './operationTable.html',
})

export class OperationTable {
  filteredShifts: any;
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;

  sections: any;
  section: any = {id: 0, 'code': 'ALL', 'display': 'All Sections'};
  shifts: any;
  shift: any = {id: 0, 'code': 'ALL', 'display': 'All Shifts'};

  startDate: Date;
  endDate: Date;
  selectedOpertion: any;
  display: boolean = false;
  pageSize = 20;

  constructor(protected service: OperationService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private sharedService: SharedService,
              private sectionService: SectionService,
              private shiftService: ShiftService) {
    this.loadData();
    this.getSections();
    this.getShifts();
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({id: 0, 'code': 'ALL', 'display': 'All Sections'});
    });
  }

  getShifts(): void {
    this.shiftService.getCombo().subscribe(shifts => {
      this.shifts = shifts;
      this.shifts.unshift({id: 0, 'code': 'ALL', 'display': 'All Shifts'});
    });
  }

  loadData() {
    this.service
      .getSectionAndShiftAndProductionDateBetweenPage(0, '1970-01-01', '2100-12-31', 0, 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSectionAndShiftAndProductionDateBetweenPage(
        this.section !== undefined ? this.section.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        this.shift !== undefined ? this.shift.id : 0,
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

  onRowClick(data: any): void {
    this.selectedOpertion = data;
    if (data.actualQuantity !== undefined && data.actualQuantity !== null && data.plannedQuantity > data.actualQuantity) {
      this.showDialog();
    }
  }

  showDialog() {
    this.display = true;
  }

  /*================== Shift Filter ===================*/
  filterShifts(event) {
    let query = event.query.toLowerCase();
    this.filteredShifts = [];
    for (let i = 0; i < this.shifts.length; i++) {
      let shift = this.shifts[i];
      if (shift.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredShifts.push(shift);
      }
    }
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
      if (section.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSections.push(section);
      }
    }
  }

  onSectionSelect(section: any) {
    console.log(event)
  }

  /*================== End Of Section Filter ===================*/

  obj2csv() {
    let obj = [];
    this.rows.forEach(row => {
      const data = {
        operationType: row.operationType.description,
        productType: row.productType.description,
        scrap: 0,
        defect: 0,
        loss: 0,
        actual: row.actualQuantity | 0,
        planned: row.plannedQuantity | 0,
        item: row.job.item.code,
        job: row.job.jobNo,
        productionDate: row.production.productionDate,
        controlPoint: row.production.controlPoint.code,
        productionID: row.production.id,
        operationID: row.id,
      };
      let scrapCount = 0;
      let defectCount = 0;
      let lossCount = 0;

      row.lossList.forEach(lossData => {
        scrapCount = lossData.lossReason.lossType.code == 'ST' ? scrapCount + lossData.quantity : scrapCount;
        defectCount = lossData.lossReason.lossType.code == 'DT' ? defectCount + lossData.quantity : defectCount;
        lossCount = lossData.lossReason.lossType.code == 'LR' ? lossCount + lossData.quantity : lossCount;
      });

      data.loss = lossCount;
      data.defect = defectCount;
      data.scrap = scrapCount;
      obj.push(data);
    });
    if (typeof obj !== 'object') return null;
    const opt: any = {};
    let scopechar = opt.scopechar || '/';
    let delimeter = opt.delimeter || ',';
    if (Array.isArray(obj) === false) obj = [obj];
    let curs, name, rownum, key, queue, values = [], rows = [], headers = {}, headersArr = [];
    for (rownum = 0; rownum < obj.length; rownum++) {
      queue = [obj[rownum], ''];
      rows[rownum] = {};
      while (queue.length > 0) {
        name = queue.pop();
        curs = queue.pop();
        if (curs !== null && typeof curs === 'object') {
          for (key in curs) {
            if (curs.hasOwnProperty(key)) {
              queue.push(curs[key]);
              queue.push(name + (name ? scopechar : '') + key);
            }
          }
        } else {
          if (headers[name] === undefined) headers[name] = true;
          rows[rownum][name] = curs;
        }
      }
      values[rownum] = [];
    }
    // create csv text
    for (key in headers) {
      if (headers.hasOwnProperty(key)) {
        headersArr.push(key);
        for (rownum = 0; rownum < obj.length; rownum++) {
          values[rownum].push(rows[rownum][key] === undefined
            ? ''
            : JSON.stringify(rows[rownum][key]));
        }
      }
    }
    for (rownum = 0; rownum < obj.length; rownum++) {
      values[rownum] = values[rownum].join(delimeter);
    }
    const result = '"' + headersArr.join('"' + delimeter + '"') + '"\n' + values.join('\n');
    this.download(result, 'OperationData-' + new Date().getTime() + '.csv', 'text/plain');
    return result;
  }

// Function to download data to a file
  download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
