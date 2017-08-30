import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { TanahviewlistPage } from "./tanahviewlist";
import { TanahPage } from "../tanah/tanah";
import {TanahProvider} from '../../providers/tanah/tanah';

@IonicPage()
@Component({
  selector: 'page-tanahview',
  templateUrl: 'tanahview.html',
})
export class TanahviewPage {
  temparr = [];
  filteredtanah = Object;
  itanah:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public tanahservice: TanahProvider, public alertCtrl: AlertController,
  ) {
    console.log(navParams);
    this.filteredtanah = navParams.data;
    
  }

  edit(key:string){
    console.log(key);
    this.navCtrl.setRoot(TanahPage,key);
  }

  delete(key:string){
    this.itanah.remove(key);
    
    this.navCtrl.setRoot(TanahviewlistPage);
  }


}
