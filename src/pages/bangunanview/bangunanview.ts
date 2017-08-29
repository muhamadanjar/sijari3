import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import {BangunanProvider} from '../../providers/bangunan/bangunan';
import {SettingProvider} from '../../providers/setting/setting';

@IonicPage()
@Component({
  selector: 'page-bangunanview',
  templateUrl: 'bangunanview.html',
})
export class BangunanviewPage {

  temparr = [];
  filteredbangunan;
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

}
