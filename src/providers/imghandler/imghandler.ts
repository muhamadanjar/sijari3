import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import {FilePath} from '@ionic-native/file-path';

import firebase from 'firebase';
@Injectable()
export class ImghandlerProvider {
  nativepath:any;
  
  imgSource:any;
  constructor() {
    //console.log('Hello ImghandlerProvider Provider');
  }

  uploadimage(){
    var promise = new Promise((resolve,reject)=>{

    });
    return promise;
  }



}
