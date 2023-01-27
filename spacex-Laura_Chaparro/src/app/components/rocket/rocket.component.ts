import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RocketInterface, RocketService } from 'src/app/services/rocket.service';

@Component({
  selector: 'rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.css']
})
export class RocketComponent implements OnInit {
  @Input()
  rocket: any;
  id:number=0;
  @Output()
  delRocket = new EventEmitter<RocketInterface>();
  constructor() {
  }

  ngOnInit(): void {
    this.id=this.rocket.id
  }

  isPositive() {
    return (this.rocket && this.rocket.height > 50);
  }

  isNegative() {
    return (this.rocket && this.rocket.height < 50);
  }
  edit(){

  }
  deleteRocket(){    
      this.delRocket.emit(this.rocket)
  }
}
