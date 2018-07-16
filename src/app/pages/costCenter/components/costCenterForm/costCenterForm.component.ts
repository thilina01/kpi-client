import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CostCenterService } from '../../costCenter.service';
import { SectionService } from '../../../section/section.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'cost-center-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./costCenterForm.scss'],
    templateUrl: './costCenterForm.html',
})
export class CostCenterForm {
    public formGroup: FormGroup;
    subscription: Subscription;
    JSON: any = JSON;
    sections: any;
    section: any;
    costCenter: any = {};

    constructor(protected service: CostCenterService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private sectionService: SectionService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            section: [this.section, Validators.required]
        });
    }

    getSections(): void {
        this.sectionService.getCombo().subscribe(sections => this.sections = sections);
    }

    ngOnInit(): void {
        this.getSections();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id === undefined ? '0' : id;
                if (id !== '0') {
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
        this.getSections();

    }

    loadForm(data: any) {
        if (data != null) {
            this.costCenter = data;
        }
        this.formGroup.patchValue(this.costCenter, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/costCenter/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
    /*================== Section Filter ===================*/
    filteredSections: any[];

    filterSection(event) {
        let query = event.query.toLowerCase();
        this.filteredSections = [];
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSections.push(section);

            }
        }
    }

    onSectionSelect(event: any) {
    }

    /*================== End Of Section Filter ===================*/
}
