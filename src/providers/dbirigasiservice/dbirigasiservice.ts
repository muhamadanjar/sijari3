import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { jaridata } from '../../models/interfaces/jaridata';
import { JariIrigasi } from '../../pages/jari/JariIrigasi';
import { Observable } from "rxjs/Observable";
import  'rxjs/Rx';
/*
  Generated class for the DbirigasiserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DbirigasiserviceProvider {
  private allTask:JariIrigasi[]=[];
  public url:string="http://10.100.10.252/api/";
  constructor(public _http: Http) {
    console.log('Hello DbirigasiserviceProvider Provider');
  }

	getAllTasks(){
		return this._http.get(this.url)
		.map((response:Response)=>response.json());
	}

	deleteTask(item:JariIrigasi){
        
     	let headers = new Headers({ 'Content-Type': 'application/json' });
     	let options = new RequestOptions({ headers: headers });
     	return this._http.delete(this.url+item.Id,options)
			.map((response:Response)=>response.json());   
  	}
  	addTask(item:JariIrigasi){
       let body = JSON.stringify(item);
       let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });
       return this._http.post(this.url+'fasilitas/insert/',body, options)
			.map((response:Response)=>response.json());
  	}
  	getTaskId(id:any){
    	return this._http.get(this.url+id)
  		.map((response:Response)=>response.json());
  	}

  	editTask(item:JariIrigasi){
       let body = JSON.stringify(item);
       let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });
       return this._http.put(this.url+item.Id,body, options)
        .map((response:Response)=>response.json());
  	}

    InsertPostFasilitas(data){
      console.log(data);
      var url = this.url+'fasilitas/insert';
      var response = this._http.post(url,data).map(res => res.json());
      return response;
    }

}
