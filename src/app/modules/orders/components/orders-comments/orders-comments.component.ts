import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {IComment} from "../../interfaces";
import {IProfile} from "../../../../share";

@Component({
  selector: 'app-orders-comments',
  templateUrl: './orders-comments.component.html',
  styleUrls: ['./orders-comments.component.css']
})
export class OrdersCommentsComponent implements OnInit, AfterViewInit {
  comments: IComment[];

  @ViewChild('allComments')
  allComments: ElementRef

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    const {comments} = this.data;
    this.comments = comments;
  }

  ngAfterViewInit() {
    this.allComments.nativeElement.scrollTop = this.allComments.nativeElement.scrollHeight;
  }

  getDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  getInitialManager(manager: IProfile): string {
    return manager.name[0].toLocaleUpperCase() + manager.surname[0].toLocaleUpperCase();
  }

  isAdminComment(comment): boolean {
    return comment.manager.id === 1;
  }
}
