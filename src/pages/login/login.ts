import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { PasswordresetPage } from '../passwordreset/passwordreset';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public authservice: AuthProvider) {
      authservice.getUser();
      storage.get('user').then((user)=>{
        if(user != null){
          navCtrl.setRoot(HomePage,null,{
            animate:true
          });
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    let loading = this.loadingCtrl.create({
      content:'Login....',
    });
    loading.present();
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code){
        this.navCtrl.setRoot(HomePage);loading.dismiss();
      }else{
        alert(res);
        let toast = this.toastCtrl.create({
            message: "Akses di tolak",
            position:"bottom",
            duration:3000
          })
        toast.present();
        loading.dismiss();
      }
        
        
    });
  }

  signin_database(){
    let loading = this.loadingCtrl.create({
      content:'Login....',
    });

    loading.present();
    this.authservice._login(this.credentials).subscribe(allowed => {
        
        if (allowed.status) {
            //this.storage.ready().then(() => {
                  this.storage.set('user', allowed.data);
                  this.storage.get('user').then((value) => {
                    console.log('storage : '+ value);
                  });  
            //});
            setTimeout(() => {
              loading.dismiss();
              this.navCtrl.setRoot(HomePage,null,{
                animate:true
              });
            });
        } else {
          let toast = this.toastCtrl.create({
            message:"Akses di tolak",
            position:"bottom",
            duration:1000
          })
          toast.present();
          loading.dismiss();
        }
    },error => {
        console.log(error);
    });
  }

  signup(){
    this.navCtrl.setRoot(SignupPage);
  }

  passwordreset(){
    this.navCtrl.setRoot(PasswordresetPage);
  }

}
