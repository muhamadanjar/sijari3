import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import {TanahProvider} from '../../providers/tanah/tanah';

@IonicPage()
@Component({
  selector: 'page-tanahview',
  templateUrl: 'tanahview.html',
})
export class TanahviewPage {
  temparr = [];
  filteredtanah = Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public tanahservice: TanahProvider, public alertCtrl: AlertController,
  ) {
    console.log(navParams);
    this.filteredtanah = navParams.data;
    
  }

  

  

}
