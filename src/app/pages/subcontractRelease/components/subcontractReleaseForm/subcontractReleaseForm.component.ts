import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/take';
import { LocationService } from '../../../location/location.service';
import { SubcontractNoteService } from '../../../subcontractNote/subcontractNote.service';

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

  constructor(protected service: SubcontractNoteService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private locationService: LocationService) {
    this.formGroup = fb.group({
      id: '',
      location: '',
      vehicleNumber: '',
      subcontractReleaseTime: [null, Validators.required],
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
    this.subcontractNote = {};
    if (this.dataTableComponent !== undefined) {
      this.dataTableComponent.reset();
    }
  }

  loadForm(id: any) {
             this.service.get(+id).subscribe(
              (subcontractNote) => {
                    if (subcontractNote != null) {
                      if (subcontractNote.subcontractReleaseTime !== null) {
                         subcontractNote.subcontractReleaseTime = new Date(subcontractNote.subcontractReleaseTime);
                       }
                       this.subcontractNote = subcontractNote;
                      this.idTextField.disabled = true;
                    }
                    this.formGroup.patchValue(this.subcontractNote, { onlySelf: true });
                }
            )
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
