import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  avatar: string = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider,public loadingCtrl:LoadingController) {
  }
 
  ionViewWillEnter() {
    this.loaduserdetails();
  }
 
  loaduserdetails() {
    let d;let p;
    this.userservice.getuserdetails().then((res: any) => {
      console.log(res);
      
      if(res.displayName === null){ d = 'noname' }else{ d = res.displayName}
      if(res.photoURL === null){ p = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e' }else{ p = res.photoURL}
      
      this.displayName = d;
      this.zone.run(() => {
        this.avatar = p;
      })
    }).catch((res:any) =>{
      if(res.displayName === null){ d = 'noname' }else{ d = res.displayName}
      //if(res.photoURL === null){ p = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e' }else{ p = res.photoURL}
      //this.avatar = p;
      this.displayName = d;
    });
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let loading = this.loadingCtrl.create({
      content:'Uploading.....'
    });
    loading.present();
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          loading.dismiss();
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })  
        }  
      }).catch((err) => {
          loading.dismiss();
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('Your profile pic was not changed');
          statusalert.present();
      })
    }).catch((err) => {
      loading.dismiss();
    });
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
 
        }
      },
      {
        text: 'Edit',
        handler: data => {
          if (data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your nickname has been changed successfully!!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                })
              }else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nickname was not changed');
                statusalert.present();
              }
                             
            })
          }
        }
        
      }]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.storage.set('user',null);
      this.navCtrl.parent.parent.setRoot(LoginPage,null,{
        animate:true
      });
    })
    
  }

}
