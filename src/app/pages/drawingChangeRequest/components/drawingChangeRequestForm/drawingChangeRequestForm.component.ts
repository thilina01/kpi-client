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
import { DrawingChangeRequestService } from '../../drawingChangeRequest.service';
import 'rxjs/add/operator/take';
import { DrawingVersionService } from '../../../drawingVersion/drawingVersion.service';

@Component({
  selector: 'drawing-change-request-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./drawingChangeRequestForm.scss'],
  templateUrl: './drawingChangeRequestForm.html'
})
export class DrawingChangeRequestForm {
  JSON: any = JSON;
  public formGroup: FormGroup;
  drawingChangeRequest: any = {};
  subscription: Subscription;
  changeRequestDate: Date = new Date();
  drawingVersionList: any;
  drawingVersion: any;

  constructor(
    protected service: DrawingChangeRequestService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private drawingVersionService: DrawingVersionService,
    private sharedService: SharedService
  ) {
    this.formGroup = fb.group({
      id: '',
      description: '',
      changeRequestDate: [this.changeRequestDate, Validators.required],
      drawingVersion: [this.drawingVersion, Validators.required]
    });
  }

  getDrawingVersionList(): void {
    this.drawingVersionService
      .getCombo()
      .subscribe(
        drawingVersionList => (this.drawingVersionList = drawingVersionList)
      );
  }

  ngOnInit(): void {
    this.getDrawingVersionList();
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
      data.changeRequestDate = new Date(data.changeRequestDate);
      this.drawingChangeRequest = data;
    }
    this.formGroup.patchValue(this.drawingChangeRequest, { onlySelf: true });
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
      this.router.navigate(['/pages/drawingChangeRequest/form/']);
    });
  }

  refresh(): void {
    this.getDrawingVersionList();
  }

  public resetForm() {
    this.formGroup.reset();
  }

  /*================== DrawingVersionFilter ===================*/
  filteredDrawingVersionList: any[];

  filterDrawingVersionList(event) {
    let query = event.query.toLowerCase();
    this.filteredDrawingVersionList = [];
    for (let i = 0; i < this.drawingVersionList.length; i++) {
      let drawingVersion = this.drawingVersionList[i];
      if (drawingVersion.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredDrawingVersionList.push(drawingVersion);
      }
    }
  }
  onDrawingVersionSelect(event: any) {}
  /*================== DrawingVersionFilter ===================*/
}
