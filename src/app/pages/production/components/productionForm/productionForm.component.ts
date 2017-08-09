import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ProductionService } from '../../../../services/production.service';
import { SharedService } from '../../../../services/shared.service';
import { ShiftService } from '../../../../services/shift.service';
import { LossTypeService } from '../../../../services/lossType.service';
import { ControlPointService } from "../../../controlPoint/controlPoint.service";

@Component({
    selector: 'production-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productionForm.scss'],
    templateUrl: './productionForm.html',
})
export class ProductionForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    public qualityFormGroup: FormGroup;
    production: any = {};
    subscription: Subscription;
    display: boolean = false;

    totalPlannedProductionQuantity = 0;
    totalPlannedManpowerQuantity = 0;

    controlPoints: any[];
    shifts: any[];
    lossTypes: any[];

    productionDate: Date;
    shift: any = {}
    controlPoint: any = {}
    lossType: any = {}


    constructor(protected service: ProductionService, private route: ActivatedRoute, fb: FormBuilder, private sharedService: SharedService, private controlPointService: ControlPointService, private shiftService: ShiftService, private lossTypeService: LossTypeService) {
        this.formGroup = fb.group({
            plannedDuration: 0,
            actualDuration: 0,
        });
        this.qualityFormGroup = fb.group({
            operation: [null, Validators.required],
            lossType:  [null, Validators.required],
            lossReason:  [null, Validators.required],
            quantity:  [null, Validators.required]
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

    getLossTypes(): void {
        this.lossTypeService.getAll().then(lossTypes => this.lossTypes = lossTypes);
    }

    ngOnInit(): void {

        this.getControlPoints();
        this.getShifts();
        this.getLossTypes();

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
        this.calculateTotalPlannedProductionQuantity();
        this.calculateTotalPlannedManpowerQuantity();
        this.calculateTotalLossQuantity();
        this.setOperationIdOnLoss();
        this.formGroup.patchValue(this.production, { onlySelf: true });
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

    calculateTotalLossQuantity() {
        if (this.production.operationList) {
            for (let operation of this.production.operationList) {
                if (operation.lossList) {
                    let lossQuantity = 0;
                    for (let rowLoss of operation.lossList) {
                        lossQuantity += +rowLoss.quantity;
                    }
                    operation.lossQuantity = lossQuantity;
                }
            }
        }
    }

    setOperationIdOnLoss() {
        if (this.production.operationList) {
            for (let operation of this.production.operationList) {
                if (operation.lossList) {
                    for (let loss of operation.lossList) {
                        loss.operation = { id: operation.id }
                    }
                }
            }
        }
    }

    deleteLoss(data:any,dataTable:any){        
        if (this.production.operationList&&data.timestamp) {
            for (let operation of this.production.operationList) {
                if (operation.id===data.operation.id && operation.lossList) {
                    for (let loss of operation.lossList) {         
                        if(loss.timestamp === data.timestamp){
                            let index = operation.lossList.indexOf(loss);
                            operation.lossList.splice(index, 1);
                            this.calculateTotalLossQuantity();
                            this.sharedService.addMessage({ severity: 'warn', summary: 'Delete Success', detail: 'loss details deleted' });
                            return;
                        }               
                    }
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

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        this.production.actualDuration = values.actualDuration
        this.production.plannedDuration = values.plannedDuration
        console.log(this.production);
        this.service.save(this.production).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
            }
        );
    }

    public onEditComplete(event: Event): void {
        //alert(JSON.stringify(event));
    }
    
    public onQualityFormSubmit(values: any): void {
        if (!this.qualityFormGroup.valid) {
            this.qualityFormGroup.reset();
            return;
        }

        let loss = {
            operation: { id: values.operation.id },
            lossReason: values.lossReason,
            quantity: values.quantity,
            timestamp:new Date().getTime()
        }
        values.operation.lossList.push(loss);

        let lossQuantity = 0;
        for (let rowLoss of values.operation.lossList) {
            lossQuantity += +rowLoss.quantity;
        }
        values.operation.lossQuantity = lossQuantity;
        this.qualityFormGroup.reset();
        this.sharedService.addMessage({ severity: 'info', summary: 'Added', detail: 'Loss Detail Added' });
        //alert(JSON.stringify(values.operation));
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
  font-size: 9px;
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
    margin-bottom: 1em;
  }

  @page {                
    size: A4 landscape;
    margin: 1em;
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

.pagebreak { page-break-before: always; } /* page-break-after works, as well */
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }
}
