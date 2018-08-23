
import { Component, Input } from '@angular/core';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';
import { PrintService } from '../../../../services/print.service';
import { SubcontractReworkNoteService } from '../../../../services/subcontractReworkNote.service';

@Component({
  selector: 'subcontract-rework-note-print',
  templateUrl: './print.html'
})
export class SubcontractReworkNotePrint {
  totalQuantity = 0.0;
  totalCost= 0.0;
  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service
        .get(+id)
        .take(1)
        .subscribe(data => {
          if (data === null) return;
          this.subcontractReworkNote = data;
          this.totalQuantity = 0.0;
          this.totalCost = 0.0;
          this.rowList = [];

          for (let i = 0; i < this.subcontractReworkNote.subcontractReworkOperationList.length; i++) {
            let subcontractReworkOperation = this.subcontractReworkNote.subcontractReworkOperationList[i];
            let jobId = subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.job.id ;
            let productTypeId = subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.productType.id;

            if (this.rowList.length === 0){
              this.totalQuantity += subcontractReworkOperation.quantity;
              this.rowList.push(this.makeRow(jobId, productTypeId, subcontractReworkOperation));
            } else {
              let found = false;
              for (let row of this.rowList) {
                if (row.jobId === jobId && row.productTypeId === productTypeId ){
                  found = true;
                  row.subRowList.push(this.makeSubRow(subcontractReworkOperation));
                }
              }
              if (!found){
                this.totalQuantity += subcontractReworkOperation.quantity;
                this.rowList.push(this.makeRow(jobId, productTypeId, subcontractReworkOperation));
              }
            }

            this.totalCost += subcontractReworkOperation.quantity * subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.rate;
          }

          setTimeout(() => {
            let element = document.getElementById('subcontract-rework-note-print');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  subcontractReworkNote: any;
  rowList = [];

  constructor(
    private service: SubcontractReworkNoteService,
    private printService: PrintService,
    private organizationService: OrganizationService
  ) {
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getAll().subscribe((data: any) => {
      this.organization = data[0];
    });
  }

  makeRow(jobId, productTypeId, subcontractReworkOperation){
    return {
      jobId : jobId,
      productTypeId : productTypeId,
      jobNo : subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.job.jobNo,
      quantity : subcontractReworkOperation.quantity,
      itemCode : subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.item.code,
      productTypeDescription : subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.productType.description,
      subRowList : [this.makeSubRow(subcontractReworkOperation)]
    };
  }

  makeSubRow(subcontractReworkOperation){
    return {
      operationType : subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.productType.description,
      unitRate : subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.rate,
      quantity : subcontractReworkOperation.quantity,
      amount : subcontractReworkOperation.quantity * subcontractReworkOperation.subcontractArrivalReject.subcontractArrival.subcontractOperation.subcontractOperationRate.rate
    };
  }

}

