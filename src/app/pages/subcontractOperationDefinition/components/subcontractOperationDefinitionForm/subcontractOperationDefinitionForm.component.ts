import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SubcontractOperationDefinitionService } from '../../subcontractOperationDefinition.service';
import { ItemService } from '../../../item/item.service';
import 'rxjs/add/operator/take';
import { ProductTypeService } from '../../../productType/productType.service';
import { OperationTypeService } from '../../../operationType/operationType.service';

@Component({
  selector: 'subcontract-operation-definition-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractOperationDefinitionForm.scss'],
  templateUrl: './subcontractOperationDefinitionForm.html'
})
export class SubcontractOperationDefinitionForm {
  JSON: any = JSON;
  public formGroup: FormGroup;
  subcontractOperationDefinition: any = {};
  subscription: Subscription;
  itemList = [];
  item: any;
  subcontractOperationDefinitionType: any;
  operationType: any;
  productType: any;
  productTypeList = [];
  operationTypeList = [];

  constructor(
    protected service: SubcontractOperationDefinitionService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private itemService: ItemService,
    private productTypeService: ProductTypeService,
    private operationTypeService: OperationTypeService,
    private sharedService: SharedService
  ) {
    this.formGroup = fb.group({
      id: '',
      description: '',
      item: [this.item, Validators.required],
      operationType: [this.operationType, Validators.required],
      productType: [this.productType, Validators.required]
    });
  }

  getItemList(): void {
    this.itemService
      .getCombo()
      .subscribe(itemList => (this.itemList = itemList));
  }

  getProductTypeList(): void {
    this.productTypeService
      .getCombo()
      .subscribe(productTypeList => (this.productTypeList = productTypeList));
  }

  getOperationTypeList(): void {
    this.operationTypeService
      .getCombo()
      .subscribe(
        operationTypeList => (this.operationTypeList = operationTypeList)
      );
  }

  ngOnInit(): void {
    this.getItemList();
    this.getOperationTypeList();
    this.getProductTypeList();
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

  refresh(): void {
    this.getItemList();
    this.getOperationTypeList();
    this.getProductTypeList();
  }

  loadForm(data: any) {
    if (data != null) {
      this.subcontractOperationDefinition = data;
    }
    this.formGroup.patchValue(this.subcontractOperationDefinition, {
      onlySelf: true
    });
    this.item = this.subcontractOperationDefinition.item;
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/subcontractOperationDefinition/form/']);
    });
  }

  public resetForm() {
    this.formGroup.reset();
  }
  /*================== ItemFilter ===================*/
  filteredItemList: any[];

  filterItemList(event) {
    let query = event.query.toLowerCase();
    this.filteredItemList = [];
    for (let i = 0; i < this.itemList.length; i++) {
      let item = this.itemList[i];
      if (item.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredItemList.push(item);
      }
    }
  }
  onItemSelect(event: any) {}
  /*================== ItemFilter ===================*/
  /*================== OperationTypeFilter ===================*/
  filteredOperationTypeList: any[];

  filterOperationTypeList(event) {
    let query = event.query.toLowerCase();
    this.filteredOperationTypeList = [];
    for (let i = 0; i < this.operationTypeList.length; i++) {
      let operationType = this.operationTypeList[i];
      if (operationType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredOperationTypeList.push(operationType);
      }
    }
  }
  onOperationTypeSelect(event: any) {}
  /*================== OperationTypeFilter ===================*/
  /*================== ProductTypeFilter ===================*/
  filteredProductTypeList: any[];

  filterProductTypeList(event) {
    let query = event.query.toLowerCase();
    this.filteredProductTypeList = [];
    for (let i = 0; i < this.productTypeList.length; i++) {
      let productType = this.productTypeList[i];
      if (productType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredProductTypeList.push(productType);
      }
    }
  }
  onProductTypeSelect(event: any) {}
  /*================== ProductTypeFilter ===================*/
}
