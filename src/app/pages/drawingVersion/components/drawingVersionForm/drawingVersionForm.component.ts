import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Papa from 'papaparse/papaparse.min.js';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DrawingVersionService } from '../../drawingVersion.service';
import 'rxjs/add/operator/take';
import { ItemService } from '../../../item/item.service';
import { DrawingChangeRequestService } from '../../../drawingChangeRequest/drawingChangeRequest.service';
import { HttpClient } from '@angular/common/http';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'drawing-version-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./drawingVersionForm.scss'],
  templateUrl: './drawingVersionForm.html'
})
export class DrawingVersionForm {
  JSON: any = JSON;
  public formGroup: FormGroup;
  drawingVersion: any = {};
  subscription: Subscription;
  item: any;
  itemList: any;
  dataSubject: Subject<any> = new Subject<any>();
  jsonData: any[] = [];
  selectedFile: File = null;
  drawingChangeRequestList: any;
  idTextField: HTMLInputElement;
  constructor(
    protected service: DrawingVersionService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    fb: FormBuilder,
    private itemService: ItemService,
    private drawingChangeRequestService: DrawingChangeRequestService,
    private sharedService: SharedService
  ) {
    this.formGroup = fb.group({
      id: '',
      description: '',
      version: ['', Validators.required],
      filePath: ['', Validators.required],
      item: [this.item, Validators.required],
      drawingChangeRequest: []
    });
  }

  getItemList(): void {
    this.itemService
      .getCombo()
      .subscribe(itemList => (this.itemList = itemList));
  }

  getDrawingChangeRequestList(): void {
    this.drawingChangeRequestService
      .getCombo()
      .subscribe(drawingChangeRequestList => (this.drawingChangeRequestList = drawingChangeRequestList));
  }

  ngOnInit(): void {
    this.getItemList();
    this.getDrawingChangeRequestList();
    // this.idTextField = <HTMLInputElement>document.getElementById('id');
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
      this.drawingVersion = data;
    }
    this.formGroup.patchValue(this.drawingVersion, { onlySelf: true });
    // this.idTextField.disabled = true;
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
      this.router.navigate(['/pages/drawingVersion/form/']);
    });
  }

  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
  }

  onUpload(){

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/', fd).subscribe(res => {
    console.log(res);

    });
  }

  // uploadHandler(event) {
  //   this.service.save(this.jsonData).subscribe(
  //     (data) => {
  //       this.router.navigate(['/pages/drawingVersion/form/']);
  //     }
  //   );
  // }

  // onSelect(event) {
  //   let file = event.files[0];
  //   let ds = this.dataSubject;
  // }

  refresh(): void {
    this.getItemList();
    this.getDrawingChangeRequestList();
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

  /*================== DrawingChangeRequestFilter ===================*/
  filteredDrawingChangeRequestList: any[];

  filterDrawingChangeRequestList(event) {
    let query = event.query.toLowerCase();
    this.filteredDrawingChangeRequestList = [];
    for (let i = 0; i < this.drawingChangeRequestList.length; i++) {
      let drawingChangeRequest = this.drawingChangeRequestList[i];
      if (drawingChangeRequest.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredDrawingChangeRequestList.push(drawingChangeRequest);
      }
    }
  }
  onDrawingChangeRequestSelect(event: any) {}
  /*================== DrawingChangeRequestFilter ===================*/

}
