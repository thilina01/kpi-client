import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { SharedService } from '../../../../services/shared.service';
import { LoadingPlanService } from '../../loadingPlan.service';
import 'rxjs/add/operator/take';
import { CustomerService } from '../../../customer/customer.service';
import { DispatchScheduleService } from '../../../dispatchSchedule/dispatchSchedule.service';
import { AddressService } from '../../../../services/address.service';
import { PortService } from '../../../port/port.service';
import { ContainerSizeService } from '../../../containerSize/containerSize.service';
import { PackagingSpecificationService } from '../../../packagingSpecification/packagingSpecification.service';
import { EmployeeService } from '../../../employee/employee.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'loading-plan-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./loadingPlanForm.scss'],
  templateUrl: './loadingPlanForm.html'
})
export class LoadingPlanForm {
  employee(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  @Input('formGroup') public formGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;
  loadingPlanItemFormGroup: FormGroup;
  loadingPlanDate: Date = new Date();
  packagingSpecificationList = [];
  packagingSpecifications: any;
  packagingSpecification: any;
  subscription: Subscription;
  dispatchScheduleList = [];
  loadingPlanItemList = [];
  loadingPlan: any = {};
  dispatchSchedule: any;
  containerSizes: any;
  containerSize: any;
  customerList = [];
  JSON: any = JSON;
  addressList = [];
  customer: any;
  address: any;
  ports: any;
  port: any;

  constructor(
    protected service: LoadingPlanService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private addressService: AddressService,
    private portService: PortService,
    private employeeService: EmployeeService,
    private containerSizeService: ContainerSizeService,
    private packagingSpecificationService: PackagingSpecificationService,
    private dispatchScheduleService: DispatchScheduleService) {
    this.formGroup = fb.group({
      id: '',
      noOfContainers: '',
      loadingPlanDate: [this.loadingPlanDate, Validators.required],
      customer: [this.customer, Validators.required],
      address: [this.address, Validators.required],
      portOfLoading: [this.port, Validators.required],
      containerSize: [this.containerSize, ''],
      loadingPlanItemList: [[]],
    });
    this.loadingPlanItemFormGroup = fb.group({
      dispatchSchedule: [this.dispatchSchedule, Validators.required],
      packagingSpecification: [this.packagingSpecification, Validators.required],
      quantity: ['', Validators.required],
      cubicMeter: '',

    });
  }

  getCustomerList(): void {
    this.customerService.getCombo().subscribe(customerList => (this.customerList = customerList));
  }

  getDispatchScheduleListByCustomer(id: number): void {
    this.dispatchScheduleService.getByCustomer(id).subscribe(
        dispatchScheduleList => (this.dispatchScheduleList = dispatchScheduleList)
      );
  }

  getaAddressListByCustomer(id: number): void {
    this.addressService.getComboByCustomer(id).subscribe(addressList => (this.addressList = addressList));
  }

  getPorts(): void {
    this.portService.getCombo().subscribe(ports => this.ports = ports);
  }

  getContainerSizes(): void {
    this.containerSizeService.getCombo().subscribe(containerSizes => this.containerSizes = containerSizes);
  }

  getPackagingSpecificationListByDispatchSchedule(id: number): void {
    this.packagingSpecificationService.getComboByItem(id).subscribe(
        packagingSpecificationList => (this.packagingSpecificationList = packagingSpecificationList)
      );
  }

  ngOnInit(): void {
    this.getPorts();
    this.getCustomerList();
    this.getContainerSizes();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id === undefined ? '0' : id;
      if (id !== '0') {
      this.service.get(+id).take(1).subscribe(data => {
            this.loadForm(data);
          });
      }
    });
  }

  fillDispatchs(): void {
    this.formGroup.value.dispatchList = this.formGroup.value.dispatchList.slice();
    this.dataTable.reset();
  }

  loadForm(data: any) {
    if (data != null) {
      data.loadingPlanDate = new Date(data.loadingPlanDate);
      this.loadingPlan = data;
    }
    this.formGroup.patchValue(this.loadingPlan, { onlySelf: true });
    this.customer = this.loadingPlan.customer;
    this.address = this.loadingPlan.address;
    this.dispatchSchedule = this.loadingPlan.dispatchSchedule;
    this.setDisplayOfCustomer(this.loadingPlan.customer);
    this.setDisplayOfAddress();
    this.setDisplayOfDispatchSchedule();
    this.setDisplayOfPackagingSpecification();
   }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    if (values.loadingPlanItemList === null || values.loadingPlanItemList.length === 0) {
      alert('loading Plan Item Required');
      return;
    }
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/loadingPlan/form/']);
    });
  }



  public onEnter(quantity: string, dt: DataTable) {
    if (this.loadingPlanItemFormGroup.valid) {
      let values = this.loadingPlanItemFormGroup.value;
      if (this.formGroup.value.loadingPlanItemList == null) {
        this.formGroup.value.loadingPlanItemList = [];
      }

      this.dispatchScheduleService.get(+values.dispatchSchedule.id).subscribe(dispatchSchedule => {
          values.dispatchSchedule = dispatchSchedule;
          this.formGroup.value.loadingPlanItemList.push(values);
          this.loadingPlanItemFormGroup.reset();
          document.getElementById('dispatchScheduleSelector').focus();
          this.formGroup.value.loadingPlanItemList = this.formGroup.value.loadingPlanItemList.slice();
        });
    }
  }


  calculateTotal() {
    let quantity = 0;
    let cubicMeter = 0;
    for (let i = 0; i < this.formGroup.value.loadingPlanItemList.length; i++) {
        let loadingPlanItem = this.formGroup.value.loadingPlanItemList[i];

        quantity += parseInt(loadingPlanItem.quantity);
        cubicMeter += parseInt(loadingPlanItem.cubicMeter);

        loadingPlanItem.noOfpackages=(loadingPlanItem.quantity / loadingPlanItem.packagingSpecification.perPalletQuantity)
        loadingPlanItem.noOfpackages += parseInt(loadingPlanItem.noOfpackages);

        loadingPlanItem.netWeight =((loadingPlanItem.quantity)*(loadingPlanItem.dispatchSchedule.job.item.weight));
        loadingPlanItem.netWeight += parseInt(loadingPlanItem.netWeight);

        loadingPlanItem.grossWeight =(loadingPlanItem.netWeight)+((( loadingPlanItem.noOfpackages)*(loadingPlanItem.packagingSpecification.palletSize.weight)));
        loadingPlanItem.grossWeight += parseInt(loadingPlanItem.grossWeight);

    }

}

  public removeLoadingPlanItem(id: number) {
    if (this.formGroup.value.loadingPlanItemList != null) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to Delete?',
            accept: () => {
                this.formGroup.value.loadingPlanItemList.splice(id, 1);
                this.fillLoadingPlanItem();
            }
        });
    }
}

  fillLoadingPlanItem(): void {
  this.formGroup.value.loadingPlanItemList = this.formGroup.value.loadingPlanItemList.slice();
  this.dataTable.reset();
}

  refresh(): void {
    this.getPorts();
    this.getCustomerList();
    this.getContainerSizes();
}

  public resetForm() {
    this.formGroup.reset();
  }

/*================== Port Filter ===================*/
    filteredPorts: any[];

    filterPorts(event) {
        let query = event.query.toLowerCase();
        this.filteredPorts = [];
        for (let port of this.ports) {
            if (port.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredPorts.push(port);
            }
        }
    }
/*================== End Of Port Filter ===================*/
/*================== ContainerSize Filter ===================*/
       filteredContainerSizes: any[];

       filterContainerSizes(event) {
           let query = event.query.toLowerCase();
           this.filteredContainerSizes = [];
           for (let containerSize of this.containerSizes) {
               if (containerSize.display.toLowerCase().indexOf(query) >= 0) {
                   this.filteredContainerSizes.push(containerSize);
               }
           }
       }
/*================== End Of ContainerSize Filter ===================*/
/*================== CustomerFilter ===================*/
   filteredCustomerList: any[];

   filterCustomerList(event) {
     let query = event.query.toLowerCase();
     this.filteredCustomerList = [];
     for (let i = 0; i < this.customerList.length; i++) {
       let customer = this.customerList[i];
       if (
         customer.code.toLowerCase().indexOf(query) === 0 ||
         customer.name.toLowerCase().indexOf(query) === 0
       ) {
         this.filteredCustomerList.push(customer);
       }
     }
   }

   handleCustomerDropdownClick() {
     this.filteredCustomerList = [];
     ///mimic remote call
     setTimeout(() => {
       this.filteredCustomerList = this.customerList;
     }, 100);
   }
   onCustomerSelect(customerCombo: any) {
     this.getDispatchScheduleListByCustomer(+customerCombo.id);
     let customer = this.formGroup.value.customer;
     this.setDisplayOfCustomer(customer);
     this.getaAddressListByCustomer(+customer.id);
   }
   setDisplayOfCustomer(customer: any) {
     if (customer != null && customer !== undefined) {
       let display =
         customer.code != null && customer.code !== undefined
           ? customer.code + ' : '
           : '';
       display +=
         customer.name != null && customer.name !== undefined
           ? customer.name
           : '';
       this.formGroup.value.customer.display = display;
     }
   }
   /*================== AddressFilter ===================*/
   filteredAddressList: any[];

   filterAddressList(event) {
     let query = event.query.toLowerCase();
     this.filteredAddressList = [];
     for (let i = 0; i < this.addressList.length; i++) {
       let address = this.addressList[i];
       if (
         address.code.toLowerCase().indexOf(query) === 0 ||
         address.name.toLowerCase().indexOf(query) === 0
       ) {
         this.filteredAddressList.push(address);
       }
     }
   }

   handleAddressDropdownClick() {
     this.filteredAddressList = [];
     ///mimic remote call
     setTimeout(() => {
       this.filteredAddressList = this.addressList;
     }, 100);
   }

   onAddressSelect(event: any) {
     this.setDisplayOfAddress();
   }

   setDisplayOfAddress() {
     let address = this.formGroup.value.address;
     if (address != null && address !== undefined) {
       let display =
         address.code != null && address.code !== undefined
           ? address.code + ' : '
           : '';
       display +=
         address.name != null && address.name !== undefined ? address.name : '';
       this.formGroup.value.address.display = display;
     }
   }
   /*================== DispatchScheduleFilter ===================*/
   filteredDispatchScheduleList: any[];

   filterDispatchScheduleList(event) {
     let query = event.query.toLowerCase();
     this.filteredDispatchScheduleList = [];
     for (let i = 0; i < this.dispatchScheduleList.length; i++) {
       let dispatchSchedule = this.dispatchScheduleList[i];
       if (
         dispatchSchedule.display.toLowerCase().indexOf(query) > -1
       ) {
         this.filteredDispatchScheduleList.push(dispatchSchedule);
       }
     }
   }

   handleDispatchScheduleDropdownClick() {
     this.filteredDispatchScheduleList = [];
     ///mimic remote call
     setTimeout(() => {
       this.filteredDispatchScheduleList = this.dispatchScheduleList;
     }, 100);
   }

   onDispatchScheduleSelect(event: any) {
     console.log(event);
     this.packagingSpecificationService.getComboByItem(event.job.item.id).subscribe(
      packagingSpecificationList => (this.packagingSpecificationList = packagingSpecificationList)
    );
   }

   setDisplayOfDispatchSchedule() {
     let dispatchSchedule = this.formGroup.value.dispatchSchedule;
     if (dispatchSchedule != null && dispatchSchedule !== undefined) {
       let display =
         dispatchSchedule.code != null && dispatchSchedule.code !== undefined
           ? dispatchSchedule.code + ' : '
           : '';
       display +=
         dispatchSchedule.name != null && dispatchSchedule.name !== undefined
           ? dispatchSchedule.name
           : '';
       this.formGroup.value.dispatchSchedule.display = display;
     }
   }
  /*================== Packaging Specification Filter ===================*/
    filteredPackagingSpecificationList: any[];

    filterPackagingSpecificationList(event) {
      let query = event.query.toLowerCase();
      this.filteredPackagingSpecificationList = [];
      for (let i = 0; i < this.packagingSpecificationList.length; i++) {
        let packagingSpecification = this.packagingSpecificationList[i];
        if (
          packagingSpecification.code.toLowerCase().indexOf(query) === 0 ||
          packagingSpecification.name.toLowerCase().indexOf(query) === 0
        ) {
          this.filteredPackagingSpecificationList.push(packagingSpecification);
        }
      }
    }

    handlePackagingSpecificationDropdownClick() {
      this.filteredPackagingSpecificationList = [];
      ///mimic remote call
      setTimeout(() => {
        this.filteredPackagingSpecificationList = this.packagingSpecificationList;
      }, 100);
    }

    onPackagingSpecificationSelect(event: any) {
      this.setDisplayOfPackagingSpecification();
    }

    setDisplayOfPackagingSpecification() {
      let packagingSpecification = this.formGroup.value.packagingSpecification;
      if (packagingSpecification != null && packagingSpecification !== undefined) {
        let display =
          packagingSpecification.code != null && packagingSpecification.code !== undefined
            ? packagingSpecification.code + ' : '
            : '';
        display +=
          packagingSpecification.name != null && packagingSpecification.name !== undefined
            ? packagingSpecification.name
            : '';
        this.formGroup.value.packagingSpecification.display = display;
      }
    }
     /*================== Packaging Specification Filter ===================*/

 }
