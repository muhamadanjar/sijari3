import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams } from 'ionic-angular';

import {BangunanviewlistPage} from '../bangunanview/bangunanviewlist';
import {TanahviewlistPage} from '../tanahview/tanahviewlist';
import {TabsPage} from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-kuesionerlist',
  templateUrl: 'kuesionerlist.html',
})
export class KuesionerlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _app:App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KuesionerlistPage');
  }

  ToBangunanPage(){
  	this._app.getRootNav().setRoot(BangunanviewlistPage,null);
  }

  ToTanahPage(){
    //this.navCtrl.setRoot(TanahPage);
    this._app.getRootNav().setRoot(TanahviewlistPage);
  }

  

  

}
