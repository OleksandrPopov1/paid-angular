import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {IEditeFormErrors, IEditeFormGroup, IGroup, IInputOptions, IOrders, IOrdersUpdate} from "../../interfaces";
import {GroupsService, OrdersService} from "../../services";
import {editeFormErrors, inputsEditeForm} from "../../constants";
import {OrdersEditeAddGroupComponent} from "../orders-edite-add-group/orders-edite-add-group.component";


@Component({
  selector: 'app-orders-edite-form',
  templateUrl: './orders-edite-form.component.html',
  styleUrls: ['./orders-edite-form.component.css']
})
export class OrdersEditeFormComponent implements OnInit {
  orders: IOrders;
  form: FormGroup<IEditeFormGroup>;
  inputOption: IInputOptions[];
  groups: IGroup[];
  dialogRefEditeGroup: MatDialogRef<OrdersEditeAddGroupComponent>;
  onEditGroup = false;

  @Output() newOrders: EventEmitter<IOrdersUpdate> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialogRefEditeForm: MatDialogRef<OrdersEditeFormComponent>,
    private matDialogRefEditeGroup: MatDialogRef<OrdersEditeAddGroupComponent>,
    private ordersService: OrdersService,
    private groupsService: GroupsService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const {orders} = this.data;
    this.orders = orders;

    this.inputOption = JSON.parse(JSON.stringify(inputsEditeForm));
    this.addGroupInArray(this.inputOption, 'Create');
    this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
    })

    this._initialForm(orders);
  }

  _initialForm(orders: IOrders): void {
    this.form = new FormGroup<IEditeFormGroup>({
      name: new FormControl(orders.name!, [
        Validators.minLength(1), Validators.maxLength(20), Validators.pattern('^[a-zA-Zа-яА-ЯїЇ]*$')
      ]),
      surname: new FormControl(orders.surname!, [
        Validators.minLength(1), Validators.maxLength(35), Validators.pattern('^[a-zA-Zа-яА-ЯїЇ]*$')
      ]),
      email: new FormControl(orders.email!, [
        Validators.minLength(1),
        Validators.maxLength(35),
        Validators.email
      ]),
      phone: new FormControl(orders.phone!, [
        Validators.minLength(1),
        Validators.maxLength(12),
        Validators.pattern('^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$'),
      ]),
      age: new FormControl(orders.age!, [
        Validators.min(16),
        Validators.max(90)
      ]),
      alreadyPaid: new FormControl(orders.alreadyPaid!, [
        Validators.min(1), Validators.max(2147483647)
      ]),
      msg: new FormControl(orders.msg!, [
        Validators.minLength(1), Validators.maxLength(100)
      ]),
      sum: new FormControl(orders.sum!, [
        Validators.min(1), Validators.max(2147483647)
      ]),
      status: new FormControl('В работе'),
      course: new FormControl(orders.course!),
      course_format: new FormControl(orders.course_format!),
      course_type: new FormControl(orders.course_type!),
      group: new FormControl(orders.group ? orders.group.name : '')
    })
  }


  changeOrders(): void {
    const group: IGroup | undefined = this.groups.find(group => this.form.value.group === group.name);

    this.form.value.group = group?.id;

    const editeValue: IOrdersUpdate = Object.fromEntries(Object.entries(this.form.value).filter(([_, value]) => !!value));

    this.ordersService.updateById(this.orders.id, editeValue).subscribe(value => {
      this.matDialogRefEditeForm.close({data: value});
    });


  }

  resetForm(): void {
    this.form.reset();
  }

  closeEditeForm(): void {
    this.matDialogRefEditeForm.close();
  }

  getError(inputName: string): string {
    return editeFormErrors[inputName as keyof IEditeFormErrors];
  }


  addGroupInArray(options: IInputOptions[], group: string): void {
    options.map(option => {
      if (option.inputServerName === 'group') {
        option.selectOptions.unshift(group);
      }
    })
  }

  createGroup(selectOptions: string): void {
    if (selectOptions === 'Create' && !this.onEditGroup) {
      this.dialogRefEditeGroup = this.dialog.open(OrdersEditeAddGroupComponent, {
        exitAnimationDuration: '0.5s',
        enterAnimationDuration: '0.5s',
      });

      this.dialogRefEditeGroup.componentInstance.newGroup.subscribe(newGroup => {
        this.onEditGroup = true;

        if (newGroup) {
          this.addGroupInArray(this.inputOption, newGroup);
          this.form.controls.group.setValue(newGroup);
        } else {
          this.form.controls.group.reset();
        }

        this.onEditGroup = false;
      })
    }
  }

}
