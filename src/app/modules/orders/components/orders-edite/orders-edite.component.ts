import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {IComment, IOrders} from "../../interfaces";
import {CommentService, OrdersService} from "../../services";
import {OrdersEditeFormComponent} from "../orders-edite-form/orders-edite-form.component";
import {AuthService} from "../../../login/servisces";
import {IProfile} from "../../../../share";
import {OrdersCommentsComponent} from "../orders-comments/orders-comments.component";


@Component({
  selector: 'app-orders-edite',
  templateUrl: './orders-edite.component.html',
  styleUrls: ['./orders-edite.component.css']
})

export class OrdersEditeComponent implements OnInit {
  form: FormGroup;
  comments: IComment[];
  lastComment: IComment;
  lastManagerInitials: string;
  message: string;
  dialogRef: MatDialogRef<OrdersEditeFormComponent>
  profile: IProfile;
  isDisableEdit = false;

  @Input() orders: IOrders;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private commentService: CommentService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._initialForm();

    this.lastComment = this.orders.comments[0];
    if (this.lastComment) {
      this.lastManagerInitials = this.lastComment.manager.name[0].toLocaleUpperCase() + this.lastComment.manager.surname[0].toLocaleUpperCase();
    }

    this.comments = this.orders.comments.reverse() || [];
    this.message = this.orders.msg || '';

    this.authService.getUser().subscribe(user => {
      if (user) {
        this.profile = user.profile;

        this._checkProfile();
        this._initialForm();
      }
    })
  }

  _initialForm(): void {
    this.form = new FormGroup({
      comment: new FormControl({value: '', disabled: this.isDisableEdit}, [
        Validators.maxLength(128),
        Validators.minLength(1),
        Validators.required
      ])
    });
  }

  _checkProfile(): void {
    if (this.orders.manager) {
      this.isDisableEdit = this.orders.manager.id !== this.profile.id;
    }
  }

  sendComment(): void {
    const manager: IProfile = {name: this.profile.name, surname: this.profile.surname};
    const newComment: IComment = {comment: this.form.value.comment, manager};

    this.commentService.addNewComment(newComment, this.orders.id).subscribe(comment => {
      this.lastComment = comment;
      this.comments.push(comment);
    });

    this.form.reset();
  }

  getDate(date: string): string {
    return new Date(date).toLocaleString();
  }


  openEdite(): void {
    this.dialogRef = this.dialog.open(OrdersEditeFormComponent, {
      exitAnimationDuration: '0.5s',
      enterAnimationDuration: '0.5s',
      autoFocus: false,
      data: {
        orders: this.orders
      }
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ordersService.getById(this.orders.id).subscribe(newOrders => {
          const changeOrders: any = this.orders;
          const keysArray = Object.keys(this.orders);

          keysArray.forEach(key => {
            changeOrders[key] = newOrders[key];
          })

          this.orders = changeOrders;
        })
      }
    })
  }


  showAllComments(): void {
    this.dialog.open(OrdersCommentsComponent, {
      exitAnimationDuration: '0.5s',
      enterAnimationDuration: '0.5s',
      data: {
        comments: this.comments
      }
    });
  }

}
