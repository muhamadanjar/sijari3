import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
@Injectable()
export class SettingProvider {
  url:string;
  constructor(public _http:Http) {
    console.log('Hello SettingProvider Provider');
    this.setUrl('http://localhost');
  }

  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;   
  }

  getAllProvinsi(){
      return this._http.get(this.url+"/api/getprovinsi")
      .map((response:Response)=>response.json());
  }

  getAllKabupaten(provinsi){
      return this._http.get(this.url+"/api/getkabupaten/"+provinsi)
      .map((response:Response)=>response.json());
  }
  
  getAllKecamatan(kabupaten){
      return this._http.get(this.url+"/api/getkecamatan/"+kabupaten)
      .map((response:Response)=>response.json());
  }

  getAllDesa(kecamatan){
      return this._http.get(this.url+"/api/getdesa/"+kecamatan)
      .map((response:Response)=>response.json());
  }

}
