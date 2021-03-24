import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratepopover',
  templateUrl: './ratepopover.component.html',
  styleUrls: ['./ratepopover.component.scss'],
})
export class RatepopoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  zipped1: boolean = true;
  zipped2: boolean = true;
  zipped3: boolean = true;
  zipped4: boolean = true;
toggleZipped1(){
  this.zipped1 = !this.zipped1;
  this.zipped2 = true;
  this.zipped3 = true;
  this.zipped4 = true;
}
toggleZipped2(){
  this.zipped1 = false;
  this.zipped2 = !this.zipped2;
  this.zipped3 = true;
  this.zipped4 = true
}

toggleZipped3(){
  this.zipped1 = false;
  this.zipped2 = false;
  this.zipped3 = !this.zipped3;
  this.zipped4 = true;
}

toggleZipped4(){
  this.zipped1 = false;
  this.zipped2 = false;
  this.zipped3 = false;
  this.zipped4 = !this.zipped4;
}


}
