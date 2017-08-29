import { Component,NgZone,ViewChild } from '@angular/core';
import { NavController,Nav,App } from 'ionic-angular';
import { TanahPage } from '../tanah/tanah';
import { BangunanPage } from '../bangunan/bangunan';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,public auth:AuthProvider,public storage:Storage,
    public zone:NgZone,
    private _app:App,
    public afAuth:AngularFireAuth) {

  }

  ToBangunanPage(){
  	this.navCtrl.setRoot(BangunanPage,null);
  }

  ToTanahPage(){
    //this.navCtrl.setRoot(TanahPage);
    this._app.getRootNav().setRoot(TanahPage);
  }

  logout(){
    this.auth._logout();
    this.storage.set('user',null);
    this._app.getRootNav().setRoot(LoginPage);
  }

}
