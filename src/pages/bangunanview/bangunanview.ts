import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { BangunanPage } from "../bangunan/bangunan";
import { BangunanviewlistPage } from "./bangunanviewlist";
import {BangunanProvider} from '../../providers/bangunan/bangunan';
import {SettingProvider} from '../../providers/setting/setting';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-bangunanview',
  templateUrl: 'bangunanview.html',
})
export class BangunanviewPage {

  temparr = [];
  filteredbangunan;
  ibangunan:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public bangunanservice: BangunanProvider, public alertCtrl: AlertController,
   public settingservice: SettingProvider
  ) {
    var o = this.settingservice.AdminLTE.options;
    this.settingservice._init();
    if (o.enableBoxWidget) {
      this.settingservice.AdminLTE.boxWidget.activate();
    }
    console.log(navParams);
    this.filteredbangunan = navParams.data;
    
  }

  edit(key:string){
    console.log(key);
    this.navCtrl.setRoot(BangunanPage,key);
  }

  delete(key:string){
    this.ibangunan.remove(key);
    
    this.navCtrl.setRoot(BangunanviewlistPage);
  }

}