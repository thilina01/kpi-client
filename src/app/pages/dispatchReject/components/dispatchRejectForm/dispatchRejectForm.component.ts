import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { LoadingPlanItemService } from '../../../../services/loadingPlanItem.service';
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';

@Component({
  selector: 'dispatch-reject-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchRejectForm.scss'],
  templateUrl: './dispatchRejectForm.html'
})
export class DispatchRejectForm {
  loadingPlanItemListToSave = [];
  loadingPlanItemList = [];
  loadingPlanItem: any;
  dispatchNoteList: any[];
  dispatchNote: any;
  rejectedQuantity = '';

  constructor(
    protected service: LoadingPlanItemService,
    private confirmationService: ConfirmationService,
    private dispatchNoteService: DispatchNoteService,
    private sharedService: SharedService
  ) {}

  getDispatchNoteList(): void {
    this.dispatchNoteService
      .getCombo()
      .subscribe(
        dispatchNoteList => (this.dispatchNoteList = dispatchNoteList)
      );
  }

  getLoadingPlanItemByDispatchNote(id: number): void {
    this.service
      .getByDispatchNote(id)
      .subscribe(
        loadingPlanItemList => (this.loadingPlanItemList = loadingPlanItemList)
      );
  }

  ngOnInit(): void {
    this.getDispatchNoteList();
  }

  addDispatchReject() {
    if (this.loadingPlanItemListToSave === undefined) {
      this.loadingPlanItemListToSave = [];
    }
    this.loadingPlanItem.rejectedQuantity = parseInt(this.rejectedQuantity, 10);
    this.loadingPlanItemListToSave.push(this.loadingPlanItem);
    this.loadingPlanItemListToSave = this.loadingPlanItemListToSave.slice();
    this.resetForm();
  }

  public save(): void {
    if (this.loadingPlanItemListToSave.length === 0) return;
    this.service.saveMany(this.loadingPlanItemListToSave).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.reset();
    });
  }

  public resetForm() {
    this.dispatchNote = null;
    this.loadingPlanItem = null;
    this.loadingPlanItemList = [];
    this.rejectedQuantity = '';
  }

  reset() {
    this.resetForm();
    this.loadingPlanItemListToSave = [];
  }

  refresh(): void {
    this.getDispatchNoteList();
  }

  /*================== DispatchNoteFilter ===================*/
  filteredDispatchNoteList: any[];

  filterDispatchNoteList(event) {
    let query = event.query.toLowerCase();
    this.filteredDispatchNoteList = [];
    for (let i = 0; i < this.dispatchNoteList.length; i++) {
      let dispatchNote = this.dispatchNoteList[i];
      if (
        dispatchNote.code.toLowerCase().indexOf(query) === 0 ||
        dispatchNote.name.toLowerCase().indexOf(query) === 0
      ) {
        this.filteredDispatchNoteList.push(dispatchNote);
      }
    }
  }

  handleDispatchNoteDropdownClick() {
    this.filteredDispatchNoteList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredDispatchNoteList = this.dispatchNoteList;
    }, 100);
  }

  onDispatchNoteSelect(dispatchNote: any) {
    this.service
      .getByDispatchNote(dispatchNote.id)
      .subscribe(
        loadingPlanItemList => (this.loadingPlanItemList = loadingPlanItemList)
      );
  }

  setDisplayOfDispatchNote(dispatchNote: any) {
    if (dispatchNote != null && dispatchNote !== undefined) {
      let display =
        dispatchNote.code != null && dispatchNote.code !== undefined
          ? dispatchNote.code + ' : '
          : '';
      display +=
        dispatchNote.name != null && dispatchNote.name !== undefined
          ? dispatchNote.name
          : '';
      this.dispatchNote.display = display;
    }
  }

  /*================== Loading Plan Item Filter ===================*/
  filteredLoadingPlanItems: any[];
  filterLoadingPlanItems(event) {
    let query = event.query.toLowerCase();
    this.filteredLoadingPlanItems = [];
    for (let i = 0; i < this.loadingPlanItemList.length; i++) {
      let loadingPlanItem = this.loadingPlanItemList[i];
      if (loadingPlanItem.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredLoadingPlanItems.push(loadingPlanItem);
      }
    }
  }

  onLoadingPlanItemSelect(event: any) {
    this.setDisplayOfLoadingPlanItem();
  }
  setDisplayOfLoadingPlanItem() {
    if (this.loadingPlanItem != null && this.loadingPlanItem !== undefined) {
      let display =
        this.loadingPlanItem.code != null &&
        this.loadingPlanItem.code !== undefined
          ? this.loadingPlanItem.code + ' : '
          : '';
      display +=
        this.loadingPlanItem.name != null &&
        this.loadingPlanItem.name !== undefined
          ? this.loadingPlanItem.name
          : '';
      this.loadingPlanItem.display = display;
    }
  }
  /*================== End Of Loading Plan Item Filter ===================*/
}
