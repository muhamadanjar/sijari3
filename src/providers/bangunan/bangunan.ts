import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingProvider } from '../setting/setting';
import firebase from 'firebase';
/*
  Generated class for the BangunanProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BangunanProvider {
  firedata = firebase.database().ref("/kuesionerbangunan")
  constructor(public http: Http) {
    //console.log('Hello BangunanProvider Provider');
  }

  getallbangunan() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.once('value', (snapshot) => {
        let bangunan = snapshot.val();
        let temparr = [];
        console.log(snapshot);
        
        for (var key in bangunan) {
          temparr.push(bangunan[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
