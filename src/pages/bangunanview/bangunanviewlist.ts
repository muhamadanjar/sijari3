import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { BangunanviewPage } from "./bangunanview";
import {BangunanProvider} from '../../providers/bangunan/bangunan';
import { TabsPage } from "../tabs/tabs";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
@IonicPage()
@Component({
  selector: 'page-bangunanviewlist',
  templateUrl: 'bangunanviewlist.html',
})
export class BangunanviewlistPage {

  temparr = [];
  filteredbangunan = [];
  ibangunan:FirebaseListObservable<any>;
  slideData = [{ image: "assets/images/slide1.jpeg" },{ image: "assets/images/slide2.jpeg" },{ image: "assets/images/slide3.jpeg" }];
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public bangunanservice: BangunanProvider, public alertCtrl: AlertController,
   private _app:App,public db:AngularFireDatabase
  ) {
    this.bangunanservice.getallbangunan().then((res: any) => {
      this.filteredbangunan = res;
      this.temparr = res;
      console.log(res);
      
    })
    this.ibangunan = this.db.list('kuesionerbangunan');

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
    this.navCtrl.push(BangunanviewPage,key);
  }

  editbangunan(key){
    console.log(key);
    
  }

  deletebangunan(key:string){
    this.ibangunan.remove(key);
    this.navCtrl.setRoot(BangunanviewlistPage);
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
