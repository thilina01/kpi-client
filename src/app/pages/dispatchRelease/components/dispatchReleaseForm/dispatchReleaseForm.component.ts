import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';
import { DispatchService } from '../../../../services/dispatch.service';

@Component({
    selector: 'dispatch-release-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dispatchReleaseForm.scss'],
    templateUrl: './dispatchReleaseForm.html',

})
export class DispatchReleaseForm {

    @Input('formGroup')
    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    public dispatchNoteFormGroup: FormGroup;
    dataTable: any;
    JSON: any = JSON;

    public FormGroup: FormGroup;
    dispatchRelease: any = {};
    subscription: Subscription;

    dispatchNote: any = {};
    dispatchReleaseTime: Date;
    totalRecords: number;
    rows = [];
    dispatchNoteList = [];
    dispatchList = [];

    constructor(protected service: DispatchNoteService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private dispatchService: DispatchService,
        private sharedService: SharedService) {

        this.formGroup = fb.group({
            id: '',
            vehicleNumber: '',
            dispatchReleaseTime: [this.dispatchReleaseTime, Validators.required],
            containerNumber: '',
            recipient: ''
        });
    }
    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.loadForm(id);
                }
            }
        );
    }

    fill(): void {
        this.clear();
        let id = this.formGroup.value.id;
        if (id == undefined || id == '') { return; }
        this.loadForm(id);
    }

    clear(): void {
        this.dispatchNote = {};
        if (this.dataTableComponent != undefined) {
            this.dataTableComponent.reset();
        }

    }

    keyDown(event) {
        if (event.keyCode == 13) {
            this.clear();
            this.fill();
        }
    }

    loadForm(id: any) {
        this.service.get(+id).subscribe(
            (data) => {
                if (data != null) {
                    data.dispatchReleaseTime = new Date(data.dispatchReleaseTime);
                    this.dispatchNote = data;
                }
                this.formGroup.patchValue(this.dispatchNote, { onlySelf: true });
            }
        )
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.saveRelease(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
        this.fill();

    }
}
