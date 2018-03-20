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
import { PackagingSpecificationService } from '../../packagingSpecification.service';
import { ToolService } from '../../../tool/tool.service';
import 'rxjs/add/operator/take';
import { ItemService } from '../../../item/item.service';
import { PalletSizeService } from '../../../palletSize/palletSize.service';

@Component({
  selector: 'packaging-specification-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./packagingSpecificationForm.scss'],
  templateUrl: './packagingSpecificationForm.html'
})
export class PackagingSpecificationForm {
  palletSizeList: any;
  palletSize: any;
  itemList: any;
  item: any;
  JSON: any = JSON;
  public formGroup: FormGroup;
  packagingSpecification: any = {};
  subscription: Subscription;

  constructor(
    protected service: PackagingSpecificationService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService,
    private palletSizeService: PalletSizeService,
    private itemService: ItemService) {
    this.formGroup = fb.group({
      id: '',
      item: [this.item, Validators.required],
      perPalletQuantity: ['', Validators.required],
      palletSize: [this.palletSize, Validators.required]
    });
  }

  geItemList(): void {
    this.itemService
      .getCombo()
      .subscribe(itemList => (this.itemList = itemList));
  }

  getPalletSizeList(): void {
    this.palletSizeService
      .getCombo()
      .subscribe(palletSizeList => (this.palletSizeList = palletSizeList));
  }

  ngOnInit(): void {
    this.geItemList();
    this.getPalletSizeList();
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
    this.geItemList();
    this.getPalletSizeList();
  }

  loadForm(data: any) {
    if (data != null) {
      this.packagingSpecification = data;
    }
    this.formGroup.patchValue(this.packagingSpecification, { onlySelf: true });
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
      this.router.navigate(['/pages/packagingSpecification/form/']);
    });
  }

  public resetForm() {
    this.formGroup.reset();
  }

  /*================== Item Filter ===================*/
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
  /*================== End of Item Filter ===================*/
  /*================== Pallet Size Filter ===================*/
  filteredPalletSizeList: any[];

  filterPalletSizeList(event) {
    let query = event.query.toLowerCase();
    this.filteredPalletSizeList = [];
    for (let i = 0; i < this.palletSizeList.length; i++) {
      let palletSize = this.palletSizeList[i];
      if (palletSize.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredPalletSizeList.push(palletSize);
      }
    }
  }

  onPalletSizeSelect(event: any) {}
  /*================== Pallet Size Filter ===================*/
}
