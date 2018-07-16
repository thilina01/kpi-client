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
import { BreakdownService } from '../../breakdown.service';
import { MachineService } from '../../../machine/machine.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'breakdown-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./breakdownForm.scss'],
  templateUrl: './breakdownForm.html'
})
export class BreakdownForm {
  JSON: any = JSON;
  public formGroup: FormGroup;
  breakdown: any = {};
  subscription: Subscription;
  machines: any;
  breakdownDate: Date;
  breakdownTime: Date = new Date();
  recoveryTime: Date = new Date();
  machine: any;
  machineList = [];

  constructor(
    protected service: BreakdownService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService,
    private machineService: MachineService
  ) {
    this.formGroup = fb.group({
      id: '',
      breakdownTime: [this.breakdownTime, Validators.required],
      recoveryTime: [this.recoveryTime, Validators.required],
      breakdownNumber: ['', Validators.required],
      machine: [this.machine, Validators.required],
      description: ['', Validators.required]
    });
  }

  getMachineList(): void {
    this.machineService
      .getCombo()
      .subscribe(machineList => (this.machineList = machineList));
  }

  ngOnInit(): void {
    this.getMachineList();
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

  refresh(): void {
    this.getMachineList();
  }

  loadForm(data: any) {
    if (data != null) {
      data.breakdownTime = new Date(data.breakdownTime);
      data.recoveryTime = new Date(data.recoveryTime);
      this.breakdown = data;
    }
    this.formGroup.patchValue(this.breakdown, { onlySelf: true });
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
      this.router.navigate(['/pages/breakdown/form/']);
    });
  }

  public resetForm() {
    this.formGroup.reset();
  }

  /*================== MachineFilter ===================*/
  filteredMachineList: any[];

  filterMachineList(event) {
    let query = event.query.toLowerCase();
    this.filteredMachineList = [];
    for (let i = 0; i < this.machineList.length; i++) {
      let machine = this.machineList[i];
      if (machine.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredMachineList.push(machine);
      }
    }
  }
  onMachineSelect(event: any) {}
  /*================== Machine Filter ===================*/
}
