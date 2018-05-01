import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';
import { DispatchService } from '../../../../services/dispatch.service';
import 'rxjs/add/operator/take';
import { LocationService } from '../../../location/location.service';
import { LoadingPlanService } from '../../../loadingPlan/loadingPlan.service';

@Component({
  selector: 'dispatch-release-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchReleaseForm.scss'],
  templateUrl: './dispatchReleaseForm.html',

})
export class DispatchReleaseForm {

  public formGroup: FormGroup;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  JSON: any = JSON;
  idTextField: HTMLInputElement;
  dispatchNote: any = {};
  xLoadingPlanItemList = [];

  constructor(protected service: DispatchNoteService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private loadingPlanService: LoadingPlanService,
    private sharedService: SharedService,
    private locationService: LocationService) {
    this.formGroup = fb.group({
      id: '',
      location: '',
      vehicleNumber: '',
      dispatchReleaseTime: [null, Validators.required],
      containerNumber: '',
      recipient: ''
    });
  }
  ngOnInit(): void {
    this.getLocations();
    this.idTextField = <HTMLInputElement>document.getElementById('id');
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        id = id === undefined ? '0' : id;
        if (id !== '0') {
          this.loadForm(id);
        }
      }
    );
  }

  fill(): void {
    this.clear();
    let id = this.formGroup.value.id;
    if (id === undefined || id === '') { return; }
    this.loadForm(id);
  }

  clear(): void {
    this.dispatchNote = {};
    if (this.dataTableComponent !== undefined) {
      this.dataTableComponent.reset();
    }
  }

  loadForm(id: any) {
    this.xLoadingPlanItemList = [];
    this.service.get(+id).take(1).subscribe(
      (dispatchNote) => {
        if (dispatchNote != null) {
          if (dispatchNote.dispatchReleaseTime !== null) {
            dispatchNote.dispatchReleaseTime = new Date(dispatchNote.dispatchReleaseTime);
          }
          this.dispatchNote = dispatchNote;
          this.idTextField.disabled = true;
        }
        console.log(dispatchNote);

        for (let i = 0; i < dispatchNote.loadingPlanList.length; i++) {
          let loadingPlan = dispatchNote.loadingPlanList[i];
          if (loadingPlan === undefined) continue;

          for (let ii = 0; ii < loadingPlan.loadingPlanItemList.length; ii++) {
            let loadingPlanItem = loadingPlan.loadingPlanItemList[ii];
            if (loadingPlanItem === undefined) continue;
              console.log(loadingPlanItem);
              this.xLoadingPlanItemList.push(loadingPlanItem);
          }
        }
        console.log(this.xLoadingPlanItemList);
        this.xLoadingPlanItemList = this.xLoadingPlanItemList.slice();
        this.formGroup.patchValue(this.dispatchNote, { onlySelf: true });
      }
    );
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    this.service.saveRelease(values).subscribe(
      (data) => {
        this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
        this.resetForm();
      }
    );
  }

  public resetForm() {
    this.idTextField.disabled = false;
    this.formGroup.reset();
    this.fill();

  }

  /*================== Location Filter ===================*/
  locations: any;
  filteredLocations: any[];

  getLocations(): void {
    this.locationService.getAll().subscribe(locations => this.locations = locations);
  }

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
    }, 100)
  }

  onLocationSelect(event: any) {

  }
  /*================== End Of Location Filter ===================*/
}
