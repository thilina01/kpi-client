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
import { InternalTransferNoteService } from '../../internalTransferNote.service';
import 'rxjs/add/operator/take';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { JobService } from '../../../job/job.service';
import { ProductTypeService } from '../../../productType/productType.service';
import { LocationService } from '../../../location/location.service';

@Component({
  selector: 'internal-transfer-note-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./internalTransferNoteForm.scss'],
  templateUrl: './internalTransferNoteForm.html'
})
export class InternalTransferNoteForm {
  @Input('formGroup') public formGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;
  internalTransferItemFormGroup: FormGroup;
  internalTransferItemList = [];
  subscription: Subscription;
  internalTransferNote: any = {};
  JSON: any = JSON;
  jobList = [];
  job: any;
  productType: any;
  productTypeList = [];
  noteDate: Date = new Date();
  location: any;
  locations: any;

  constructor(
    protected service: InternalTransferNoteService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private productTypeService: ProductTypeService,
    private locationService: LocationService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = fb.group({
      id: '',
      description: '',
      fromLocation: [this.location, Validators.required],
      toLocation: [this.location, Validators.required],
      noteDate: [this.noteDate, Validators.required],
      internalTransferItemList: [[]]
    });
    this.internalTransferItemFormGroup = fb.group({
      quantity: ['', Validators.required],
      job: [this.job, Validators.required],
      productType: [this.productType, Validators.required]
    });
  }

  getProductTypeList(): void {
    this.productTypeService
      .getCombo()
      .subscribe(productTypeList => (this.productTypeList = productTypeList));
  }

  getLocations(): void {
    this.locationService
      .getAll()
      .subscribe(locations => (this.locations = locations));
  }

  ngOnInit(): void {
    this.getProductTypeList();
    this.getLocations();
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
      data.noteDate = new Date(data.noteDate);
      this.internalTransferNote = data;
    }
    this.formGroup.patchValue(this.internalTransferNote, { onlySelf: true });
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    if (
      values.internalTransferItemList === null ||
      values.internalTransferItemList.length === 0
    ) {
      alert('Internal Transfer Item Required');
      return;
    }
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/internalTransferNote/form/']);
    });
  }

  public onEnter() {
    if (this.internalTransferItemFormGroup.valid) {
      let values = this.internalTransferItemFormGroup.value;
      if (this.formGroup.value.internalTransferItemList == null) {
        this.formGroup.value.internalTransferItemList = [];
      }
      this.formGroup.value.internalTransferItemList.push(values);
      this.internalTransferItemFormGroup.reset();
      document.getElementById('jobSelector').focus();
      this.formGroup.value.internalTransferItemList = this.formGroup.value.internalTransferItemList.slice();
    }
  }

  public removeInternalTransferItem(id: number) {
    if (this.formGroup.value.internalTransferItemList != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete?',
        accept: () => {
          this.formGroup.value.internalTransferItemList.splice(id, 1);
          this.fillInternalTransferItem();
        }
      });
    }
  }

  fillInternalTransferItem(): void {
    this.formGroup.value.internalTransferItemList = this.formGroup.value.internalTransferItemList.slice();
    this.dataTable.reset();
  }

  refresh(): void {
    this.getProductTypeList();
    this.getLocations();
  }

  public resetForm() {
    this.formGroup.reset();
    this.internalTransferItemFormGroup.reset();
  }

  /*================== Job Filter ===================*/
  filteredJobList: any[];

  filterJobList(event) {
    let query = event.query.toLowerCase();
    if (query.length > 2)
      this.jobService
        .getJobNoLike(query)
        .subscribe(jobList => (this.filteredJobList = jobList));
  }
  onJobSelect(event: any) {}
  /*================== Job Filter ===================*/
  /*================== ProductType Filter ===================*/
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
  /*================== ProductType Filter ===================*/

  /*================== Location Filter ===================*/
  filteredLocations: any[];

  filterLocations(event) {
    let query = event.query.toLowerCase();
    this.filteredLocations = [];
    for (let i = 0; i < this.locations.length; i++) {
      let location = this.locations[i];
      if (location.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredLocations.push(location);
      }
    }
  }

  handleLocationDropdownClick() {
    this.filteredLocations = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredLocations = this.locations;
    }, 100);
  }

  onLocationSelect(event: any) {}
  /*================== End Of Location Filter ===================*/
}
