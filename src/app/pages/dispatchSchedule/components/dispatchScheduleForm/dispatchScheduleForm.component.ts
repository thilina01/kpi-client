import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemService } from '../../../item/item.service';
import { DispatchScheduleService } from '../../dispatchSchedule.service';
import { DispatchScheduleTypeService } from '../../../dispatchScheduleType/dispatchScheduleType.service';
import { CustomerItemService } from '../../../customerItem/customerItem.service';
import { CustomerPoNumberService } from '../../../customerPoNumber/customerPoNumber.service';
import { SalesOrderService } from '../../../salesOrder/salesOrder.service';
import { JobService } from '../../../job/job.service';

@Component({
  selector: 'dispatch-schedule-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchScheduleForm.scss'],
  templateUrl: './dispatchScheduleForm.html',
})
export class DispatchScheduleForm {
  salesOrder: any;
  salesOrders: any;
  jobList: Array<any> = [];
  customerPoNumber: any;
  customerPoNumbers: any;
  salesOrderTypes: any;
  salesOrderType: any;
  salesOrderItem: any;
  customerItems: any;
  customerItem: any;
  poNumber: any;
  JSON: any = JSON;

  public formGroup: FormGroup;
  dispatchSchedule: any = {};
  dispatchScheduleList: Array<any> = [];
  subscription: Subscription;

  dispatchScheduleTypes: any;
  items: any;

  dispatchDate: Date;
  confirmDate: Date;
  requestDate: Date;
  dispatchScheduleTime: Date = new Date();
  recoveryTime: Date = new Date();
  dispatchScheduleType: any = { id: '', code: '', type: '' }
  item: any = { id: '', code: '', description: '' }
  jobNumber = '';

  constructor(protected service: DispatchScheduleService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService,
    private customerItemService: CustomerItemService,
    private salesOrderService: SalesOrderService,
    private jobService: JobService,
    private itemService: ItemService) {

    this.formGroup = fb.group({
      id: '',
      quantity: ['', Validators.required],
      confirmDate: '',
      requestDate: [this.requestDate, Validators.required],
      item: [{}, Validators.required],
      job: [undefined, Validators.required],
      salesOrderItem: [{}, Validators.required]
    });
  }

  getSalesOrders(): void {
    this.salesOrderService.getCombo().subscribe(salesOrders => this.salesOrders = salesOrders);
  }

  getJobList(itemId: Number): void {
    this.jobService.getComboByItem(itemId).subscribe(jobList => {
      jobList.unshift({ id: 0, code: 'New', name: 'New Job' });
      this.jobList = jobList;
    });
  }

  ngOnInit(): void {
    this.getSalesOrders();
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        id = id == undefined ? '0' : id;
        if (id != '0') {
          this.fill(id);
        }
      }
    );
  }

  salesOrderId: number = 0;
  print() {
    this.salesOrderId = 0;
    this.salesOrderId = this.salesOrder.id;
  }
  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    if ((values.salesOrderItem.scheduled + values.quantity) <= values.salesOrderItem.quantity) {
      if (values.job.id == 0) {
        values.job = { jobNo: this.jobNumber, quantity: values.quantity, item: values.item };
      }
      this.service.save(values).subscribe(
        (data) => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
          this.resetForm();
          this.jobNumber = '';
          this.display = false;
          this.onSalesOrderSelect(this.salesOrder);
        }
      );
    } else {
      alert('invalid quantity');
    }
  }

  public resetForm() {
    this.formGroup.reset();
  }

  display: boolean = false;

  showDialog(data: any) {
    console.log(data);
    let item = data.customerItem.item;
    this.dispatchSchedule = {
      item: item,
      quantity: (data.quantity - data.allocated),
      salesOrderItem: data
    };
    this.getJobList(item.id);
    this.formGroup.patchValue(this.dispatchSchedule, { onlySelf: true });
    this.display = true;
  }


  fill(salesOrderId: number) {
    this.salesOrderService.get(salesOrderId).subscribe(
      (data) => {
        this.salesOrder = data;
        this.setDisplayOfSalesOrder();
      }
    );
    this.service.getBySalesOrder(salesOrderId).subscribe(
      (data) => {
        this.dispatchScheduleList = data;
      }
    );
  }

  /*================== Sales Order Filter ===================*/
  filteredSalesOrders: any[];

  filterSalesOrders(event) {
    let query = event.query.toLowerCase();
    this.filteredSalesOrders = [];
    for (let i = 0; i < this.salesOrders.length; i++) {
      let salesOrder = this.salesOrders[i];
      if (salesOrder.code.toLowerCase().indexOf(query) == 0 || salesOrder.name.toLowerCase().indexOf(query) == 0) {
        this.filteredSalesOrders.push(salesOrder);
      }
    }
  }

  handleSalesOrderDropdownClick() {
    this.filteredSalesOrders = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredSalesOrders = this.salesOrders;
    }, 100)
  }

  onSalesOrderSelect(event: any) {
    this.fill(this.salesOrder.id);
  }

  setDisplayOfSalesOrder() {
    if (this.salesOrder != null && this.salesOrder != undefined) {
      let display = this.salesOrder.code != null && this.salesOrder.code != undefined ? this.salesOrder.code + ' : ' : '';
      display += this.salesOrder.name != null && this.salesOrder.name != undefined ? this.salesOrder.name : '';
      this.salesOrder.display = display;
    }
  }
  /*================== End Of Sales Order Filter ===================*/
  /*================== Job Filter ===================*/
  filteredJobList: any[];

  filterJobList(event) {
    let query = event.query.toLowerCase();
    this.filteredJobList = [];
    for (let i = 0; i < this.jobList.length; i++) {
      let job = this.jobList[i];
      if ((job.code != undefined && job.code.toLowerCase().indexOf(query) == 0) || (job.name != undefined && job.name.toLowerCase().indexOf(query) == 0)) {
        this.filteredJobList.push(job);
      }
    }
  }

  handleJobDropdownClick() {
    this.filteredJobList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredJobList = this.jobList;
    }, 100)
  }

  onJobSelect(event: any) {
    this.setDisplayOfJob();
  }

  setDisplayOfJob() {
    this.jobNumber = '';
    let job = this.formGroup.value.job;
    if (job != null && job != undefined) {
      let display = job.code != null && job.code != undefined ? job.code + ' : ' : '';
      display += job.name != null && job.name != undefined ? job.name : '';
      this.formGroup.value.job.display = display;
    }
  }
  /*================== End of Job Filter ===================*/
}
