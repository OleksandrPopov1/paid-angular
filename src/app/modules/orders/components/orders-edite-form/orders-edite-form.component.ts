import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {IEditeFormErrors, IEditeFormGroup, IInputOptions, IOrders, IOrdersUpdate} from "../../interfaces";
import {OrdersService} from "../../services";
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
  dialogRefEditeGroup: MatDialogRef<OrdersEditeAddGroupComponent>;
  onEditGroup = false;

  @Output() newOrders: EventEmitter<IOrders> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialogRefEditeForm: MatDialogRef<OrdersEditeFormComponent>,
    private matDialogRefEditeGroup: MatDialogRef<OrdersEditeAddGroupComponent>,
    private ordersService: OrdersService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this._initialForm();
    const {orders} = this.data;
    this.orders = orders;

    this.inputOption = JSON.parse(JSON.stringify(inputsEditeForm));
    this.addGruopInArray(this.inputOption, 'Create');
  }

  _initialForm(): void {
    this.form = new FormGroup<IEditeFormGroup>({
      name: new FormControl('', [
        Validators.minLength(1), Validators.maxLength(20), Validators.pattern('^[a-zA-Zа-яА-ЯїЇ]*$')
      ]),
      surname: new FormControl('', [
        Validators.minLength(1), Validators.maxLength(35), Validators.pattern('^[a-zA-Zа-яА-ЯїЇ]*$')
      ]),
      email: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(35),
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(12),
        Validators.pattern('^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$'),
      ]),
      age: new FormControl(null, [
        Validators.min(16),
        Validators.max(90)
      ]),
      alreadyPaid: new FormControl(null, [
        Validators.min(1), Validators.max(2147483647)
      ]),
      msg: new FormControl('', [
        Validators.minLength(1), Validators.maxLength(100)
      ]),
      sum: new FormControl(null, [
        Validators.min(1), Validators.max(2147483647)
      ]),
      status: new FormControl('В работе'),
      course: new FormControl(''),
      course_format: new FormControl(''),
      course_type: new FormControl(''),
      group: new FormControl('')
    })
  }


  addGruopInArray(options: IInputOptions[], group: string): void {
    options.map(option => {
      if (option.inputServerName === 'group') {
        option.selectOptions.unshift(group);
      }
    })
  }


  changeOrders(): void {
    const editeValue: IOrdersUpdate = Object.fromEntries(Object.entries(this.form.value).filter(([_, value]) => !!value));

    this.ordersService.updateById(this.orders.id, editeValue).subscribe(value => {
      this.orders = value;
      this.newOrders.emit(value);
    });

    this.matDialogRefEditeForm.close();
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


  createGroup(selectOptions: string) {
    if (selectOptions === 'Create' && !this.onEditGroup) {
      this.dialogRefEditeGroup = this.dialog.open(OrdersEditeAddGroupComponent, {
        exitAnimationDuration: '0.5s',
        enterAnimationDuration: '0.5s',
      });

      this.dialogRefEditeGroup.componentInstance.newGroup.subscribe(newGroup => {
        this.onEditGroup = true;

        if (newGroup) {
          this.addGruopInArray(this.inputOption, newGroup);
          this.form.controls.group.setValue(newGroup);
        } else {
          this.form.controls.group.reset();
        }

        this.onEditGroup = false;
      })
    }
  }

}
