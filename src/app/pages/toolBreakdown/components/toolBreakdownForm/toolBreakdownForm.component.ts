import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ToolBreakdownService } from "../../toolBreakdown.service";
import { ToolService } from "../../../tool/tool.service";

@Component({
    selector: 'tool-breakdown-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolBreakdownForm.scss'],
    templateUrl: './toolBreakdownForm.html',
})
export class ToolBreakdownForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    toolBreakdown: any = {};
    subscription: Subscription;

    tools: any;

    toolBreakdownTime: Date = new Date();
    recoveryTime: Date = new Date();
    tool: any = { id: '', code: '' }

    constructor(protected service: ToolBreakdownService,
        private route: ActivatedRoute,
        private router: Router, fb: FormBuilder,
        private sharedService: SharedService,
        private toolService: ToolService) {
        this.formGroup = fb.group({
            id: '',
            toolBreakdownTime: [this.toolBreakdownTime, Validators.required],
            recoveryTime: [this.recoveryTime, Validators.required],
            toolBreakdownNumber: ['', Validators.required],
            tool: [this.tool, Validators.required],
            description: ['', Validators.required]
        });
    }

    getTools(): void {
        this.toolService.getCombo().subscribe(tools => this.tools = tools);
    }

    ngOnInit(): void {
        this.getTools();
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
            this.toolBreakdown = data;
            this.toolBreakdown.recoveryTime = new Date(data.recoveryTime);
            this.toolBreakdown.toolBreakdownTime = new Date(data.toolBreakdownTime);
        }
        this.formGroup.patchValue(this.toolBreakdown, { onlySelf: true });
        this.tool = this.toolBreakdown.tool;
        this.setDisplayOfTool();
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/toolBreakdown/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== Tool Filter ===================*/
    filteredTools: any[];
    //tool: any;

    filterTools(event) {
        let query = event.query.toLowerCase();
        this.filteredTools = [];
        for (let i = 0; i < this.tools.length; i++) {
            let tool = this.tools[i];
            if (tool.code.toLowerCase().indexOf(query) == 0 || tool.name.toLowerCase().indexOf(query) == 0) {
                this.filteredTools.push(tool);
            }
        }
    }

    handleToolDropdownClick() {
        this.filteredTools = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredTools = this.tools;
        }, 100)
    }

    onToolSelect(event: any) {
        this.setDisplayOfTool();
    }

    setDisplayOfTool() {
        let tool = this.formGroup.value.tool;
        if (tool != null && tool != undefined) {
            let display = tool.code != null && tool.code != undefined ? tool.code + " : " : "";
            display += tool.name != null && tool.name != undefined ? tool.name : "";
            this.formGroup.value.tool.display = display;
        }
    }
    /*================== End Of Tool Filter ===================*/
}

