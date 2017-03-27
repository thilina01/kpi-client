import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router'


import { ProductionService } from '../../../../services/production.service';
import { SharedService } from '../../../../services/shared.service';
import { ShiftService } from '../../../../services/shift.service';
import { LossTypeService } from '../../../../services/lossType.service';
import { ControlPointService } from '../../../../services/controlPoint.service';

@Component({
    selector: 'production-print',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productionPrint.scss'],
    templateUrl: './productionPrint.html',
})
export class ProductionPrint {
    JSON: any = JSON;

    production: any = {};
    subscription: Subscription;
    display: boolean = false;

    totalPlannedProductionQuantity = 0;
    totalPlannedManpowerQuantity = 0;

    controlPoints: Array<Object>;
    shifts: Object[];
    lossTypes: Object[];

    productionDate: Date;
    shift: any = {}
    controlPoint: any = {}
    lossType: any = {}


    constructor(protected service: ProductionService, private route: ActivatedRoute, private sharedService: SharedService, private controlPointService: ControlPointService, private shiftService: ShiftService, private lossTypeService: LossTypeService) {
       


    }

    loadForm(data: any) {
        if (data != null) {
            this.production = data;
        }
        this.calculateTotalPlannedProductionQuantity();
        this.calculateTotalPlannedManpowerQuantity();
        this.calculateTotalLossQuantity();
        this.setOperationIdOnLoss();
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
