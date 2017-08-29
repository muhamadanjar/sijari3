import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { BangunanviewPage } from "./bangunanview";
import {BangunanProvider} from '../../providers/bangunan/bangunan';
import { TabsPage } from "../tabs/tabs";
@IonicPage()
@Component({
  selector: 'page-bangunanviewlist',
  templateUrl: 'bangunanviewlist.html',
})
export class BangunanviewlistPage {

  temparr = [];
  filteredbangunan = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public bangunanservice: BangunanProvider, public alertCtrl: AlertController,
   private _app:App
  ) {
    this.bangunanservice.getallbangunan().then((res: any) => {
      this.filteredbangunan = res;
      this.temparr = res;
      console.log(res);
      
   })
  }

  searchbangunan(searchbar) {
    this.filteredbangunan = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredbangunan = this.filteredbangunan.filter((v) => {
      if (v.lokasi_proyek.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  viewbangunan(key){
    console.log(key);
    this.navCtrl.push(BangunanviewPage,key);
    
  }

  close(){
    this._app.getRootNav().setRoot(TabsPage);
  }

  doRefresh(refresher){
    console.log();

    setTimeout(()=>{
      this.bangunanservice.getallbangunan().then((res: any) => {
        this.filteredbangunan = res;
        this.temparr = res;
        console.log(res);
      });
      refresher.complete();
    },2000);
    
  }

}
