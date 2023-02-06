import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {IComment, IOrders} from "../../interfaces";
import {OrdersService} from "../../services";
import {OrdersEditeFormComponent} from "../orders-edite-form/orders-edite-form.component";


@Component({
  selector: 'app-orders-comments',
  templateUrl: './orders-comments.component.html',
  styleUrls: ['./orders-comments.component.css']
})

export class OrdersCommentsComponent implements OnInit {
  form: FormGroup;
  comment: IComment;
  message: string;
  dialogRef: MatDialogRef<OrdersEditeFormComponent>

  @Input() orders: IOrders;

  // @Output() newOrders: EventEmitter<IOrders> = new EventEmitter();


  constructor(private ordersService: OrdersService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this._initialForm();

    if (this.orders.comments.length) {
      this.comment = this.orders.comments[0];
    }

    this.message = this.orders.msg || '';
  }

  _initialForm(): void {
    this.form = new FormGroup({
      comment: new FormControl('')
    })
  }

  sendComment(): void {
    console.log(this.form.value);
    // this.orders.comment.push() = ;
    // this.ordersService.updateById(this.orders.id, this.orders);
    this.form.reset();
  }


  openEdite(): void {
    this.dialogRef = this.dialog.open(OrdersEditeFormComponent, {
      exitAnimationDuration: '0.5s',
      enterAnimationDuration: '0.5s',
      data: {
        orders: this.orders
      }
    });

    this.dialogRef.componentInstance.newOrders.subscribe(result => {
      console.log(this.orders)
      this.orders = result;
      // this.orders.name = result.name;
      // this.orders.surname = result.surname;
      // this.orders.msg = result.msg;
      // this.orders.age = result.age;
      // this.orders.group = result.group;
      // this.orders.alreadyPaid = result.alreadyPaid;
      // this.orders.course = result.course;
      // this.orders.course_format = result.course_format;
      // this.orders.course_type = result.course_type;
      // this.orders.email = result.email;
      // this.orders.phone = result.phone;
      // this.orders.status = result.status;
      // this.orders.sum = result.sum;
      console.log(this.orders)
    });


    // this.dialog.afterAllClosed.subscribe(() => {
    //   console.log(1)
    //   const newOrders = this.orders;
    //   newOrders.name =  'sasa';
    //   this.orders.name = 'sasa';
    //   // this.orders = {...this.dialogRef.componentInstance.orders};
    //
    // });
  }

}
