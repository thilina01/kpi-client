import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/take';
import { InvoiceService } from '../../../invoice/invoice.service';
import { LoadingPlanItemService } from '../../../../services/loadingPlanItem.service';
import { CreditNoteService } from './creditNote.service';
import { InvoiceTypeService } from '../../../invoiceType/invoiceType.service';

@Component({
  selector: 'credit-note-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./creditNoteForm.scss'],
  templateUrl: './creditNoteForm.html'
})
export class CreditNoteForm {
  @Input('formGroup')
  public formGroup: FormGroup;
  @ViewChild(DataTable)
  dataTable: DataTable;
  dateOfCreditNote: Date = new Date();
  creditNoteItemFormGroup: FormGroup;
  subscription: Subscription;
  loadingPlanItemList = [];
  creditNote: any = {};
  loadingPlanItem: any;
  totalAmount = 0.0;
  invoiceTypes: any;
  JSON: any = JSON;
  totalRecords = 0;
  invoiceList: any;
  invoiceType: any;
  invoice: any;

  constructor(
    protected service: CreditNoteService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private invoiceService: InvoiceService,
    private invoiceTypeService: InvoiceTypeService,
    private loadingPlanItemService: LoadingPlanItemService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = fb.group({
      id: '',
      creditNoteItemList: [[]],
      creditNoteNumber: ['', Validators.required],
      invoice: [this.invoice, Validators.required],
      invoiceType: [this.invoiceType, Validators.required],
      dateOfCreditNote: [this.dateOfCreditNote, Validators.required]
    });
    this.creditNoteItemFormGroup = fb.group({
      quantity: '',
      itemCode: '',
      unitPrice: '',
      itemDescription: '',
      loadingPlanItem: [this.loadingPlanItem, Validators.required]
    });
  }

  getInvoiceList(): void {
    this.invoiceService
      .getCombo()
      .subscribe(invoiceList => (this.invoiceList = invoiceList));
  }

  getInvoiceTypes(): void {
    this.invoiceTypeService
      .getAll()
      .subscribe(invoiceTypes => (this.invoiceTypes = invoiceTypes));
  }

  getLoadingPlanItemListByInvoice(id: number): void {
    this.loadingPlanItemService
      .getByInvoice(id)
      .subscribe(
        loadingPlanItemList => (this.loadingPlanItemList = loadingPlanItemList)
      );
  }

  ngOnInit(): void {
    this.getInvoiceList();
    this.getInvoiceTypes();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id === undefined ? '0' : id;
      if (id !== '0') {
        this.service
          .get(+id)
          .take(1)
          .subscribe(data => {
            this.loadForm(data);
          });
      }
    });
  }

  loadForm(data: any) {
    if (data != null) {
      data.dateOfCreditNote = new Date(data.dateOfCreditNote);
      this.creditNote = data;
    }
    this.formGroup.patchValue(this.creditNote, { onlySelf: true });
    this.calculateTotal();
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    values = this.formGroup.value;
    if (
      values.creditNoteItemList === null ||
      values.creditNoteItemList.length === 0
    ) {
      alert('Credit Note Item Required');
      return;
    }
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/invoice/form/']);
    });
  }

  refresh(): void {
    this.getInvoiceList();
  }

  public resetForm() {
    this.formGroup.reset();
    this.totalAmount = 0.0;
    this.creditNoteItemFormGroup.reset();
  }

  public onEnter() {
    if (this.creditNoteItemFormGroup.valid) {
      let values = this.creditNoteItemFormGroup.value;
      if (this.formGroup.value.creditNoteItemList == null) {
        this.formGroup.value.creditNoteItemList = [];
      }
      for (let i = 0; i < this.formGroup.value.creditNoteItemList.length; i++) {
        let creditNoteItem = this.formGroup.value.creditNoteItemList[i];
        values.unitPrice = creditNoteItem.unitPrice;
        values.quantity = creditNoteItem.quantity;
        values.itemCode = creditNoteItem.itemCode;
        values.itemDescription = creditNoteItem.itemDescription;
      }
      this.formGroup.value.creditNoteItemList.push(values);
      this.calculateTotal();
      this.creditNoteItemFormGroup.reset();
      document.getElementById('loadingPlanItemSelector').focus();
      this.formGroup.value.creditNoteItemList = this.formGroup.value.creditNoteItemList.slice();
    }
  }
  onEditComplete(row) {
    this.formGroup.value.creditNoteItemList[row.index].itemCode = String(
      this.formGroup.value.creditNoteItemList[row.index].itemCode
    );
    this.formGroup.value.creditNoteItemList[row.index].itemDescription = String(
      this.formGroup.value.creditNoteItemList[row.index].itemDescription
    );
    this.formGroup.value.creditNoteItemList[row.index].quantity = Number(
      this.formGroup.value.creditNoteItemList[row.index].quantity
    );
    this.formGroup.value.creditNoteItemList[row.index].unitPrice = Number(
      this.formGroup.value.creditNoteItemList[row.index].unitPrice
    );
    this.formGroup.value.creditNoteItemList[row.index].amount =
      this.formGroup.value.creditNoteItemList[row.index].quantity *
      this.formGroup.value.creditNoteItemList[row.index].unitPrice;

    this.totalAmount = 0;
    for (let i = 0; i < this.formGroup.value.creditNoteItemList.length; i++) {
      this.totalAmount += this.formGroup.value.creditNoteItemList[i].amount;
    }
  }

  calculateTotal() {
    for (let i = 0; i < this.formGroup.value.creditNoteItemList.length; i++) {
      let creditNoteItem = this.formGroup.value.creditNoteItemList[i];
      creditNoteItem.unitPrice = creditNoteItem.loadingPlanItem.unitPrice;
      creditNoteItem.itemCode =
        creditNoteItem.loadingPlanItem.dispatchSchedule.job.item.code;
      creditNoteItem.itemDescription =
        creditNoteItem.loadingPlanItem.dispatchSchedule.job.item.description;

      if (
        creditNoteItem.unitPrice === null ||
        creditNoteItem.unitPrice === undefined
      ) {
        creditNoteItem.unitPrice =
          creditNoteItem.loadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
        creditNoteItem.amount =
          creditNoteItem.quantity * creditNoteItem.unitPrice;
      }
      creditNoteItem.quantity = creditNoteItem.loadingPlanItem.invoiceQuantity;
      creditNoteItem.amount =
        creditNoteItem.quantity * creditNoteItem.unitPrice;
      this.totalAmount += creditNoteItem.amount;
    }
  }

  /*================== Invoice Filter ===================*/
  filteredInvoiceList: any[];

  filterInvoiceList(event) {
    let query = event.query.toLowerCase();
    this.filteredInvoiceList = [];
    for (let i = 0; i < this.invoiceList.length; i++) {
      let invoice = this.invoiceList[i];
      if (invoice.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredInvoiceList.push(invoice);
      }
    }
  }
  onInvoiceSelect(invoiceCombo: any) {
    this.getLoadingPlanItemListByInvoice(+invoiceCombo.id);
  }
  /*================== Invoice Filter ===================*/
  /*================== LoadingPlanItem Filter ===================*/
  filteredLoadingPlanItemList: any[];

  filterLoadingPlanItemList(event) {
    let query = event.query.toLowerCase();
    this.filteredLoadingPlanItemList = [];
    for (let i = 0; i < this.loadingPlanItemList.length; i++) {
      let loadingPlanItem = this.loadingPlanItemList[i];
      if (loadingPlanItem.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredLoadingPlanItemList.push(loadingPlanItem);
      }
    }
  }
  onLoadingPlanItemSelect(event: any) {}
  /*================== LoadingPlanItem Filter ===================*/
  /*================== Invoice Type Filter ===================*/
  filteredInvoiceTypes: any[];

  filterInvoiceTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredInvoiceTypes = [];
    for (let i = 0; i < this.invoiceTypes.length; i++) {
      let invoiceType = this.invoiceTypes[i];
      if (invoiceType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredInvoiceTypes.push(invoiceType);
      }
    }
  }

  onInvoiceTypeSelect(event: any) {}

  /*================== End Of Invoice Type Filter ===================*/
}
