import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController,Refresher } from 'ionic-angular';
import { TanahviewPage } from "./tanahview";
import {TanahProvider} from '../../providers/tanah/tanah';
import { TabsPage } from "../tabs/tabs";
@IonicPage()
@Component({
  selector: 'page-tanahviewlist',
  templateUrl: 'tanahviewlist.html',
})
export class TanahviewlistPage {
  temparr = [];
  filteredtanah = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public tanahservice: TanahProvider, public alertCtrl: AlertController,
   private _app:App
  ) {
    this.tanahservice.getalltanah().then((res: any) => {
      this.filteredtanah = res;
      this.temparr = res;
      console.log(res);
      
   })
  }

  searchtanah(searchbar) {
    this.filteredtanah = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredtanah = this.filteredtanah.filter((v) => {
      if (v.lokasi_proyek.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  viewtanah(key){
    console.log(key);
    this.navCtrl.push(TanahviewPage,key);
    
  }

  close(){
    this._app.getRootNav().setRoot(TabsPage);
  }

  doRefresh(refresher){
    console.log();

    setTimeout(()=>{
      this.tanahservice.getalltanah().then((res: any) => {
          this.filteredtanah = res;
          this.temparr = res;
          console.log(res);
          
      })
      refresher.complete();
    },2000);
    
  }

  

}
