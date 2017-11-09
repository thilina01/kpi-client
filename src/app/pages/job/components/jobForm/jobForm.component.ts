import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemService } from '../../../item/item.service';
import { JobService } from '../../job.service';
import { JobTypeService } from '../../../jobType/jobType.service';
import { CustomerItemService } from '../../../customerItem/customerItem.service';
import { CustomerPoNumberService } from '../../../customerPoNumber/customerPoNumber.service';
import { SalesOrderService } from '../../../salesOrder/salesOrder.service';

@Component({
    selector: 'job-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobForm.scss'],
    templateUrl: './jobForm.html',
})
export class JobForm {
    itemList: Array<any> = [];
    JSON: any = JSON;

    public formGroup: FormGroup;
    job: any = {};
    subscription: Subscription;

    constructor(protected service: JobService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private itemService: ItemService) {

        this.formGroup = fb.group({
            id: '',
            jobNo: ['', Validators.required],
            quantity: ['', Validators.required],
            item: [{}, Validators.required]
        });
    }

    geItemList(): void {
        this.itemService.getCombo().subscribe(itemList => this.itemList = itemList);
    }

    ngOnInit(): void {
        this.geItemList();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    refresh(): void {
        this.geItemList();

    }

    loadForm(data: any) {
        if (data != null) {
            this.job = data;
        }
        this.formGroup.patchValue(this.job, { onlySelf: true });
        this.setDisplayOfItem();
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
            }
        );
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
            if ((item.code != undefined && item.code.toLowerCase().indexOf(query) == 0) || (item.name != undefined && item.name.toLowerCase().indexOf(query) == 0)) {
                this.filteredItemList.push(item);
            }
        }
    }

    handleItemDropdownClick() {
        this.filteredItemList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredItemList = this.itemList;
        }, 100)
    }

    onItemSelect(event: any) {
        this.setDisplayOfItem();
    }

    setDisplayOfItem() {
        let item = this.formGroup.value.item;
        if (item != null && item != undefined) {
            let display = item.code != null && item.code != undefined ? item.code + ' : ' : '';
            display += item.name != null && item.name != undefined ? item.name : '';
            this.formGroup.value.item.display = display;
        }
    }
    /*================== End of Item Filter ===================*/
}
