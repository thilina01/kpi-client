



import { Component, Input } from '@angular/core';
import { SubcontractNoteService } from '../../subcontractNote.service';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'print',
  templateUrl: './print.html'
})
export class Print {
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
          this.subcontractNote = data;
          this.totalQuantity = 0.0;
          this.totalCost = 0.0;
          this.rowList = [];

          for (let i = 0; i < this.subcontractNote.subcontractOperationList.length; i++) {
            let subcontractOperation = this.subcontractNote.subcontractOperationList[i];
            let jobId = subcontractOperation.job.id ;
            let productTypeId = subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.productType.id;

            if (this.rowList.length === 0){
              this.totalQuantity += subcontractOperation.quantity;
              this.rowList.push(this.makeRow(jobId, productTypeId, subcontractOperation));
            } else {
              let found = false;
              for (let row of this.rowList) {
                if (row.jobId === jobId && row.productTypeId === productTypeId ){
                  found = true;
                  row.subRowList.push(this.makeSubRow(subcontractOperation));
                }
              }
              if (!found){
                this.totalQuantity += subcontractOperation.quantity;
                this.rowList.push(this.makeRow(jobId, productTypeId, subcontractOperation));
              }
            }

            this.totalCost += subcontractOperation.quantity * subcontractOperation.subcontractOperationRate.rate;
          }

          setTimeout(() => {
            let element = document.getElementById('print');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  subcontractNote: any;
  rowList = [];

  constructor(
    private service: SubcontractNoteService,
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

  makeRow(jobId, productTypeId, subcontractOperation){
    return {
      jobId : jobId,
      productTypeId : productTypeId,
      jobNo : subcontractOperation.job.jobNo,
      quantity : subcontractOperation.quantity,
      itemCode : subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.item.code,
      productTypeDescription : subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.productType.description,
      subRowList : [this.makeSubRow(subcontractOperation)]
    };
  }

  makeSubRow(subcontractOperation){
    return {
      operationType : subcontractOperation.subcontractOperationRate.subcontractorOperation.subcontractOperationDefinition.operationType.description,
      unitRate : subcontractOperation.subcontractOperationRate.rate,
      quantity : subcontractOperation.quantity,
      amount : subcontractOperation.quantity * subcontractOperation.subcontractOperationRate.rate
    };
  }

}

