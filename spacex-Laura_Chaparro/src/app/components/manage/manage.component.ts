import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RocketInterface, RocketService } from 'src/app/services/rocket.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  rocket?: RocketInterface;
  saveRocket:Boolean=true
  id=0
  notifier
  constructor(private service: RocketService,private activatedRoute:ActivatedRoute,notifierService: NotifierService,private router : Router) {
    this.setInitial()    
    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.id= this.activatedRoute.snapshot.params['id']      
          
      if(this.id!=0){
        this.service.getRocket(this.id).subscribe(rocket=>{
          this.rocket= {
            id: rocket.id,
            name: rocket.name,
            description: rocket.description,
            height: rocket.height,
            country: rocket.country,
            flickr_images: rocket.flickr_images
          }
        })        
        this.saveRocket=false
      }else{
        this.setInitial()
      }
   
  }
  
  setInitial(){
    this.rocket = {
      id: 0,
      name: '',
      description: '',
      height: 0,
      country: '',
      flickr_images: []
    }
  }

  save() {
    if(this.saveRocket){      
      this.service.add(this.rocket!);
      this.setInitial()
      this.notifier.notify('success', 'Se creo correctamente el cohete');
      setTimeout(() => {
        this.router.navigate([""])
       }, 1500);
    }else{      
      this.service.put(this.rocket!);
      this.setInitial()
      this.notifier.notify('success', 'Se editó correctamente el cohete');
      setTimeout(() => {
        this.router.navigate([""])
       }, 1500);
    }
    
  }

}
