import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders-filter-input',
  templateUrl: './orders-filter-input.component.html',
  styleUrls: ['./orders-filter-input.component.css']
})
export class OrdersFilterInputComponent implements OnInit, AfterViewInit{

  @Input()


  constructor(){

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
