import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let service: string = 'http://localhost:3000/rockets';
let rockets: Array<RocketInterface> = [];

export interface RocketInterface {
  id: number;
  name: string;
  description: string;
  height: number;
  country: string;
  flickr_images: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class RocketService {

  constructor(private http: HttpClient) { }

  get() {    
    return rockets.slice();
  }

  getRocket(id:Number) {    
    return this.http.get<RocketInterface>(service + '/' + id)
  }

  load() {
    return this.http.get<Array<RocketInterface>>(service);
  }

  add(rocket: RocketInterface) {
    rockets.push(rocket);
    console.log(rocket);
    this.http.post(service, rocket).subscribe();
    return this.get();
  }
  
  put(rocket:RocketInterface){
    this.http.put(service+ '/' + rocket.id,rocket).subscribe()
    return this.get()
  }

  remove(rocket: RocketInterface) {
    this.http.delete(service+'/'+rocket.id).subscribe(); 
    return this.get();
  }
}
