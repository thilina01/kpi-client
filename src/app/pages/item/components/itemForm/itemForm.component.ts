import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemService } from '../../item.service';
import { ItemTypeService } from '../../../itemType/itemType.service';
import { PaintService } from '../../../paint/paint.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'item-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./itemForm.scss'],
    templateUrl: './itemForm.html',
})
export class ItemForm {
    JSON: any = JSON;
    checked: boolean = false;
    public formGroup: FormGroup;
    item: any = {};
    subscription: Subscription;

    itemTypeList: any;
    paints: any;
    itemType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

    constructor(protected service: ItemService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private itemTypeService: ItemTypeService,
        private paintService: PaintService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            description: ['', Validators.required],
            size: [''],
            weight: ['', Validators.required],
            volume: ['', Validators.required],
            drawingVersion: [''],
            drawingApproval: false,
            productionToolAvailability: false,
            itemType: [this.itemType, Validators.required],
            paint: [this.paint, Validators.required]
        });
    }

    getItemTypes(): void {
        this.itemTypeService.getCombo().subscribe(itemTypeList => this.itemTypeList = itemTypeList);
    }

    getPaints(): void {
        this.paintService.getCombo().subscribe(paints => this.paints = paints);
    }

    ngOnInit(): void {
        this.getItemTypes();
        this.getPaints();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).take(1).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    refresh(): void {
        this.getItemTypes();
        this.getPaints();
    }

    loadForm(data: any) {
        if (data == null) {
            return;
        }
        this.item = data;
        this.item.drawingApproval = this.item.drawingApproval === 'yes' ? true : false;
        this.item.productionToolAvailability = this.item.productionToolAvailability === 'yes' ? true : false;
        this.formGroup.patchValue(this.item, { onlySelf: true });
        this.itemType = this.item.itemType;
    }
    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);

        values.drawingApproval = values.drawingApproval ? 'yes' : 'no';
        values.productionToolAvailability = values.productionToolAvailability ? 'yes' : 'no';
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/item/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== Item Type Filter ===================*/
    filteredItemTypes: any[];

    filterItemTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredItemTypes = [];
        for (let i = 0; i < this.itemTypeList.length; i++) {
            let itemType = this.itemTypeList[i];
            if (itemType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredItemTypes.push(itemType);

            }
        }
    }

    onItemTypeSelect
        (event: any) {
    }

    /*================== End Of Item Type Filter ===================*/
    /*================== Paint Filter ===================*/
    filteredPaints: any[];

    filterPaints(event) {
        let query = event.query.toLowerCase();
        this.filteredPaints = [];
        for (let i = 0; i < this.paints.length; i++) {
            let paint = this.paints[i];
            if (paint.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredPaints.push(paint);

            }
        }
    }

    onPaintSelect(event: any) {

    }
    /*================== End Of Paint Filter ===================*/
}

