import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public auth:AuthProvider,public storage:Storage,
    public afAuth:AngularFireAuth) {

  }

  ToBangunanPage(){
  	this.navCtrl.setRoot(BangunanPage);
  }

  ToTanahPage(){
  	this.navCtrl.setRoot(TanahPage);
  }

  logout(){
    this.auth._logout();
    this.storage.set('user',null);
    this.navCtrl.setRoot(LoginPage);
  }

}
