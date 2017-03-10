import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ProductionService } from '../../../../services/production.service';
import { SharedService } from '../../../../services/shared.service';
import { ShiftService } from '../../../../services/shift.service';
import { ControlPointService } from '../../../../services/controlPoint.service';

@Component({
    selector: 'production-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productionForm.scss'],
    templateUrl: './productionForm.html',
})
export class ProductionForm {

    public formGroup: FormGroup;
    production: any = {};
    subscription: Subscription;
    display: boolean = false;

    totalPlannedProductionQuantity = 0;    
    totalPlannedManpowerQuantity = 0;

    controlPoints: Array<Object>;
    shifts: Object[];

    productionDate: Date;
    shift: any = {}
    controlPoint: any = {}


    constructor(protected service: ProductionService, private route: ActivatedRoute, fb: FormBuilder, private sharedService: SharedService, private controlPointService: ControlPointService, private shiftService: ShiftService) {
        this.formGroup = fb.group({
            // id:'',
            // productionDate:'',
            // shift:fb.group({code:'',name:''}),
            // controlPoint:fb.group({code:'',name:''}),
            // plannedDuration:0,
            actualDuration: 0,
        });
    }

    displaySearch(): void {
        this.display = true;
    }

    searchProduction(): void {
        console.log(this.productionDate); console.log(this.controlPoint); console.log(this.shift)
        this.display = false;
        let production = {
            productionDate: this.productionDate,
            shift: this.shift,
            controlPoint: this.controlPoint
        }
        this.service.findByProductionDateAndShiftAndControlPoint(production).then(
            (data) => {
                this.loadForm(data);
                if (data != null) {
                    this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                }
            }
        )
    }


    getControlPoints(): void {
        this.controlPointService.getAll().then(controlPoints => this.controlPoints = controlPoints);
    }

    getShifts(): void {
        this.shiftService.getAll().then(shifts => this.shifts = shifts);
    }
    ngOnInit(): void {

        this.getControlPoints();
        this.getShifts();

        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? 1 : id;
                this.service.getOne(+id).then(
                    (data) => {
                        this.loadForm(data);
                    }
                )
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            this.production = data;
        }
        this.formGroup.patchValue(this.production, { onlySelf: true });
        this.calculateTotalPlannedProductionQuantity();
        this.calculateTotalPlannedManpowerQuantity();
    }

    calculateTotalPlannedProductionQuantity() {
        this.totalPlannedProductionQuantity = 0;
        if (this.production.operationList) {
            for (let operation of this.production.operationList) {
                if (operation.plannedQuantity) {
                    this.totalPlannedProductionQuantity += operation.plannedQuantity;
                }
            }
        }
    }
    
    calculateTotalPlannedManpowerQuantity() {
        this.totalPlannedManpowerQuantity = 0;
        if (this.production.operationList) {
            for (let mapower of this.production.manpowerList) {
                if (mapower.plannedQuantity) {
                    this.totalPlannedManpowerQuantity += mapower.plannedQuantity;
                }
            }
        }
    }
    public onSubmit(values: any): void {
        this.production.actualDuration = values.actualDuration
        this.service.save(this.production).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
            }
        );
    }
    

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>        
          <title>Print tab</title>
  <link rel="stylesheet"  type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" media="print">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

          <style>
          .table-condensed{
  font-size: 10px;
}
.table > tbody > tr > td {
     vertical-align: middle;
}
          @media print {
              .table td{
    border: black solid 0.5px !important;
}

.table th{
    border: black solid 0.5px !important;
}

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #000;
    margin: 1em 0;
    padding: 0; 
}
  div.divFooter {
    position: fixed;
    bottom: 0;
    font-size: 10px;
    width: 90%;
    margin-bottom: 2.5em;
  }

  @page {                
    size: A4 landscape;
    margin: 2.5em;
  }

  html, body {
    width: 1024px;
    
   font-size: 1em !important;
   color: #000 !important;
   font-family: Arial !important;
  }

  body {
    margin: 0 auto;
  }
}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }
}
