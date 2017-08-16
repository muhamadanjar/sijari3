import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {UserProvider} from '../../providers/user/user';

@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userservice:UserProvider,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  reset(){ 
    let alert = this.alertCtrl.create({
      buttons:['OK']
    });
    this.userservice.passswordreset(this.email).then((res:any)=>{
      if(res.success){
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow instruction from email to reset password');
      }else{
        alert.setTitle('Failed');
      }
    });
  }

  goback(){
    this.navCtrl.setRoot(LoginPage);
  }

}
