import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/take';
import { LocationService } from '../../../location/location.service';
import { SubcontractNoteService } from '../../../subcontractNote/subcontractNote.service';
import { SubcontractReworkNoteService } from '../../../../services/subcontractReworkNote.service';

@Component({
  selector: 'subcontract-release-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractReleaseForm.scss'],
  templateUrl: './subcontractReleaseForm.html',

})
export class SubcontractReleaseForm {

  public formGroup: FormGroup;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  JSON: any = JSON;
  idTextField: HTMLInputElement;
  subcontractNote: any = {};
  subcontractReworkNote: any = {};
  subcontractReworkNotes: any;
  subcontractNoteId: any;
  subcontractReworkOperationList = [];
  subcontractReworkNoteId: any;

  constructor(protected service: SubcontractNoteService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private locationService: LocationService,
    private subcontractReworkNoteService: SubcontractReworkNoteService) {
    this.formGroup = fb.group({
      id: '',
      location: '',
      vehicleNumber: '',
      subcontractReleaseTime: [null, Validators.required],
      containerNumber: '',
      recipient: ''
    });
  }

  getLocations(): void {
    this.locationService.getAll().subscribe(locations => this.locations = locations);
  }

  ngOnInit(): void {
    this.getLocations();
    this.idTextField = <HTMLInputElement>document.getElementById('id');
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        id = id === undefined ? '0' : id;
        if (id !== '0') {
        }
      }
    );
  }

  fill(): void {
    this.clear();
    if (this.subcontractNoteId.startsWith('R') || this.subcontractNoteId.startsWith('r')){
        let id = this.subcontractNoteId.substring(1);
        this.subcontractReworkNoteService.get(id).take(1).subscribe(
        (data) => {
          if (data != null) {
            this.subcontractReworkNote = data;
            if (this.subcontractReworkNote.subcontractReleaseTime !== null) {
              this.subcontractReworkNote.subcontractReleaseTime = new Date(this.subcontractReworkNote.subcontractReleaseTime);
            }
          }
           this.formGroup.patchValue(this.subcontractReworkNote, { onlySelf: true });
           this.formGroup.value.subcontractReleaseTime = this.subcontractReworkNote.subcontractReleaseTime;
           this.formGroup.value.vehicleNumber = this.subcontractReworkNote.vehicleNumber;
           this.formGroup.value.containerNumber = this.subcontractReworkNote.containerNumber;
           this.formGroup.value.recipient = this.subcontractReworkNote.recipient;
           this.formGroup.value.location = this.subcontractReworkNote.location;

            }
          );
        }

    else {
      this.service.get(this.subcontractNoteId).take(1).subscribe(
        (data) => {
          if (data != null) {
            this.subcontractNote = data;
            if (this.subcontractNote.subcontractReleaseTime !== null) {
              this.subcontractNote.subcontractReleaseTime = new Date(this.subcontractNote.subcontractReleaseTime);
            }
          }
          this.formGroup.patchValue(this.subcontractNote, { onlySelf: true });
           this.formGroup.value.subcontractReleaseTime = this.subcontractNote.subcontractReleaseTime;
            this.formGroup.value.vehicleNumber = this.subcontractNote.vehicleNumber;
            this.formGroup.value.containerNumber = this.subcontractNote.containerNumber;
            this.formGroup.value.recipient = this.subcontractNote.recipient;
            this.formGroup.value.location = this.subcontractNote.location;
        }
      );
    }
  }

  clear(): void {
    this.subcontractNote = {};
    if (this.dataTableComponent !== undefined) {
      this.dataTableComponent.reset();
    }
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    values = this.formGroup.value;

    if (this.subcontractNote.id != null){

      this.service.saveSubcontractNoteRelease(values).subscribe(data => {
        this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/subcontractRelease/form/']);
      });
    }

    else{
      this.subcontractReworkNoteService.saveSubcontractReworkNoteRelease(values).subscribe(xData => {
        this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/subcontractRelease/form/']);
      });
    }
  }

  public resetForm() {
    this.subcontractReworkNote = {};
    this.formGroup.reset();
    this.subcontractNoteId = '';
    this.subcontractNote = {};
  }

  /*================== Location Filter ===================*/
  locations: any;
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
    }, 100)
  }

  onLocationSelect(event: any) {

  }
  /*================== End Of Location Filter ===================*/
}
