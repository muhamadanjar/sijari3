import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SettingProvider } from "../../providers/setting/setting";
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dbsetting:SettingProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  close(){
		this.navCtrl.setRoot(TabsPage);
  }
  load(){
    this.dbsetting.loadwilayah();
  }

}
