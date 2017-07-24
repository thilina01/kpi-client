import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ItemService } from '../../../../services/item.service';
import { SharedService } from '../../../../services/shared.service';
import { ItemTypeService } from '../../../../services/itemType.service';
import { PaintService } from '../../../../services/paint.service';

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

    itemTypes: any;
    paints: any;

    itemDate: Date;
    itemTime: Date = new Date();
    recoveryTime: Date = new Date();
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
        this.itemTypeService.getCombo().then(itemTypes => this.itemTypes = itemTypes);
    }

    getPaints(): void {
        this.paintService.getCombo().then(paints => this.paints = paints);
    }

    ngOnInit(): void {
        this.getItemTypes();
        this.getPaints();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).then(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data == null) {
            return;
        }
        this.item = data;
        this.item.drawingApproval = this.item.drawingApproval === "yes" ? true : false;
        this.item.productionToolAvailability = this.item.productionToolAvailability === "yes" ? true : false;
        this.formGroup.patchValue(this.item, { onlySelf: true });
        this.itemType = this.item.itemType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);

        values.drawingApproval = values.drawingApproval ? "yes" : "no";
        values.productionToolAvailability = values.productionToolAvailability ? "yes" : "no";
        this.service.save(values).then(
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

}
