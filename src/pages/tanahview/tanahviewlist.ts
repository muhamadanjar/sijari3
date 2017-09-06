import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController,Refresher } from 'ionic-angular';
import { TanahviewPage } from "./tanahview";
import {TanahProvider} from '../../providers/tanah/tanah';
import { TabsPage } from "../tabs/tabs";
import { TanaheditPage } from "./tanahedit";
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-tanahviewlist',
  templateUrl: 'tanahviewlist.html',
})
export class TanahviewlistPage {
  temparr = [];
  filteredtanah = [];
  itanah:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public tanahservice: TanahProvider, public alertCtrl: AlertController,
   private _app:App,public db:AngularFireDatabase
  ) {
    this.loadData();
    this.itanah = this.db.list('kuesionertanah');
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
  edittanah(key){
    this.navCtrl.setRoot(TanaheditPage,key);
  }

  deletetanah(key:string){
    if(key !== null){
      this.itanah.remove(key);
      this.navCtrl.setRoot(TanahviewlistPage);
    }
    
  }

  close(){
    this._app.getRootNav().setRoot(TabsPage);
  }

  doRefresh(refresher){
    console.log(refresher);
    setTimeout(()=>{
      this.loadData();
      refresher.complete();
    },2000);
    
  }

  loadData(){
    this.tanahservice.getalltanah().then((res: any) => {
          this.filteredtanah = res;
          this.temparr = res;
          console.log(res);
    })
  }

  

}
