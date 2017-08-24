import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import {Observable} from 'rxjs/Observable';
import {usercreds} from '../../models/interfaces/usercreds';
import { Http,Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import { SettingProvider} from '../setting/setting';

@Injectable()
export class User {
  name: string;
  email: string;
  username: string;
  password: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
@Injectable()
export class AuthProvider {

  private rootUrl = 'http://localhost';
  private error;
  currentUser:User;
  
  constructor(public afireauth: AngularFireAuth,public _http: Http,private storage: Storage,
    private setting: SettingProvider) {
    console.log('Hello AuthProvider Provider');
    this.rootUrl = setting.url;
  }
  getUser(){
    return this.storage.get('user');
  }
  login(credentials: usercreds) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        
        this.storage.set('user', credentials.email);
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })

    return promise;
    
  }

  _login(credentials: usercreds){
    
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this._http.post(this.rootUrl+'/api/login', JSON.stringify(credentials)) .subscribe(res => {
              let data = res.json();
              
              if(data.status) {
                this.currentUser = new User(data.name, data.email);
                this.storage.set('user', JSON.stringify(this.currentUser));
              }
              
              observer.next(data);
              observer.complete();
        });
      });
    }
    
  }

  public _register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public _getUserInfo() : User {
    return this.currentUser;
  }
 
  public _logout() {
    this.afireauth.auth.signOut();
    return Observable.create(observer => {
      this.currentUser = null;
      this.storage.set('user', null);
      observer.next(true);
      observer.complete();
    });
  }


  private handleError(error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      this.error = errMsg;
      return Observable.throw(errMsg);
  }

  private handleErrorLogin(error: Response | any){

  }

}
