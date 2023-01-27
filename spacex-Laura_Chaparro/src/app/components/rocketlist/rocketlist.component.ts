import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RocketService, RocketInterface } from 'src/app/services/rocket.service';

@Component({
  selector: 'rocketlist',
  templateUrl: './rocketlist.component.html',
  styleUrls: ['./rocketlist.component.css']
})
export class RocketlistComponent implements OnInit {
  rockets: Array<RocketInterface>;
  notifier
  constructor(private service: RocketService,notifierService: NotifierService) {
    this.rockets = [];
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.service.load()?.subscribe(rockets => {this.rockets = rockets});   
    
  }

  deleteRocket(rocket:RocketInterface){
    let index = this.rockets.indexOf(rocket)
    this.rockets.splice(index,1)
    this.service.remove(rocket)
    this.notifier.notify('success', 'Se eliminó correctamente el cohete')
  }

}
