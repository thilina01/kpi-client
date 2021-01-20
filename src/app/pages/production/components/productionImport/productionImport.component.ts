import {Component, ViewEncapsulation} from '@angular/core';
import * as Papa from 'papaparse/papaparse.min.js';
import {Subject} from "rxjs/Subject";
import {ProductionService} from "../../production.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: '',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./productionImport.scss'],
  templateUrl: './productionImport.html',
})

export class ProductionImport {


  dataSubject: Subject<any> = new Subject<any>();

  jsonData: any[] = [];
  productions: any[] = [];
  cols: any[];

  constructor(protected service: ProductionService,
              private router: Router,
              private sharedService: SharedService) {

  }

  ngOnInit() {
    this.cols = [
      {field: 'controlPoint', header: 'Control Point'},
      {field: 'productionDate', header: 'Production Date'},
      {field: 'shift', header: 'Shift'},
      {field: 'shiftType', header: 'Shift Type'},
      {field: 'plannedDuration', header: 'Planned Duration'},
      {field: 'job', header: 'Job'},
      {field: 'plannedQuantity', header: 'Planned Quantity'},
      {field: 'productType', header: 'Product Type'},
      {field: 'operationType', header: 'Operation Type'},
      {field: 'scheduleId', header: 'Schedule Id'},
      {field: 'startTime', header: 'Start Time'},
      {field: 'endTime', header: 'End Time'}
    ];
    this.dataSubject.subscribe(data => {
      this.jsonData = data;
    });
  }

  uploadHandler(event) {
    this.jsonData.forEach(value => {
      let existing = false;
      const operation = {
        "job": {
          "jobNo": value.job
        },
        "productType": {
          "code": value.productType
        },
        "operationType": {
          "code": value.operationType
        },
        "plannedQuantity": value.plannedQuantity,
        "scheduleId": value.scheduleId,
        "startTime": value.startTime,
        "endTime": value.endTime
      };
      this.productions.forEach(production => {
        if (production.productionDate == value.productionDate &&
          production.controlPoint.code == value.controlPoint &&
          production.shift.code == value.shift &&
          production.shiftType.code == value.shiftType
        ) {
          if (!production.operationList) {
            production.operationList = [];
          }
          production.operationList.push(operation);
          existing = true;
        }
      })
      if(!existing){
        const production = {
          "productionDate": value.productionDate,
          "plannedDuration": value.plannedDuration,
          "controlPoint": {
            "code": value.controlPoint
          },
          "shift": {
            "code": value.shift
          },
          "shiftType": {
            "code": value.shiftType
          },
          "operationList": [
            operation
          ]

        };
        this.productions.push(production);

      }
    });

    // console.log(this.productions);

    this.service.saveMany(this.productions).subscribe(
      (data) => {
        this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
        this.router.navigate(['/pages/production/table/']);
      }
    );
  }

  onSelect(event) {
    let file = event.files[0];
    let ds = this.dataSubject;
    Papa.parse(file, {
      skipEmptyLines: true,
      header: true,
      complete: function (results) {
        ds.next(results.data);
      }
    });
  }

}
