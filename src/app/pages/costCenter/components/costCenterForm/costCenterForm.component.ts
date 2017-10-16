import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CostCenterService } from '../../costCenter.service';
import { SectionService } from '../../../section/section.service';

@Component({
    selector: 'cost-center-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./costCenterForm.scss'],
    templateUrl: './costCenterForm.html',
})
export class CostCenterForm {
    sections: any;
    section: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    costCenter: any = {};
    subscription: Subscription;

    costCenterTypes: any;
    paints: any;

    costCenterDate: Date;
    costCenterTime: Date = new Date();
    recoveryTime: Date = new Date();
    costCenterType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

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

    loadForm(data: any) {
        if (data != null) {
            this.costCenter = data;
        }
        this.formGroup.patchValue(this.costCenter, { onlySelf: true });
        this.costCenterType = this.costCenter.costCenterType;
        this.setDisplayOfSection();
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
            if (section.code.toLowerCase().indexOf(query) == 0 || section.name.toLowerCase().indexOf(query) == 0) {
                this.filteredSections.push(section);
            }
        }
    }

    handleSectionDropdownClick() {
        this.filteredSections = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSections = this.sections;
        }, 100)
    }

    onSectionSelect(event: any) {
        this.setDisplayOfSection();
    }

    setDisplayOfSection() {

        let section = this.formGroup.value.section;
        if (section != null && section != undefined) {
            let display = section.code != null && section.code != undefined ? section.code + ' : ' : '';
            display += section.name != null && section.name != undefined ? section.name : '';
            this.formGroup.value.section.display = display;
        }

    }
    /*================== End Of Section Filter ===================*/
}
