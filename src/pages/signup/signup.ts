import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import {LoginPage} from '../login/login';
import {ProfilepicPage} from '../profilepic/profilepic';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email:'',
    password:'',
    displayName:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public userservice: UserProvider
    ,public loadingCtrl:LoadingController,public toastCtrl:ToastController,
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    var toaster = this.toastCtrl.create({
  		duration: 5000,
  		position: "bottom"
  	});
  	if(this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
  		toaster.setMessage("Semua field harus diisi");
  		toaster.present();
  	}else if(this.newuser.password.length < 7){
  		toaster.setMessage("password kurang dari 7");
  		toaster.present();
  	}else{
      let loader = this.loadingCtrl.create({
         content:"Tunggu"
      });
        loader.present();
      this.userservice.addUser(this.newuser).then((res:any) =>{
        loader.dismiss();
        if(res.success){
          this.navCtrl.push(ProfilepicPage);
        }else{
          alert("error"+res);
        }
      });
    }
  }

  goback(){
    this.navCtrl.setRoot(LoginPage);
  }

}
