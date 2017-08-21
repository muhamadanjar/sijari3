import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

import { SettingProvider } from '../../providers/setting/setting';
import { bangunanData } from './bangunanData';
import {TabsPage} from '../tabs/tabs';
import {Storage} from '@ionic/storage';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
@Component({
  selector: 'page-bangunan',
  templateUrl: 'bangunan.html',
  providers:[Geolocation]
})
export class BangunanPage {
  public data = {} as bangunanData;
  allProvinsi;allKabupaten;allKecamatan;allKelurahan;
  bangunanForm: FormGroup;
  public error: string;
  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dbsetting:SettingProvider,
		public storage:Storage,
    db: AngularFireDatabase,
    private _fb: FormBuilder,
    public geolocation:Geolocation,
		public geolocationService: GeolocationProvider,
  ) {
		this.items = db.list('/kuesionerbangunan');
    this.bangunanForm = this._fb.group({
			lokasi_proyek: [""],
			kode_prov: [""],
			kode_kab: [""],
			kode_kec: [""],
			kode_kel: [""],
			jorong: [""],
			id_user:[""],
			nama_pemilik: [""],
			alamat_pemilik: [""],

		});
		this.dbsetting.getAllProvinsi().subscribe((data)=>{
      this.allProvinsi=data;
      },function (error){
        console.log("error"+error);
      },function(){
        console.log("Mengambil data kecamatan");
      }
		);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BangunanPage');
  }

  addBangunan(){

  }

  close(){
		this.navCtrl.setRoot(TabsPage);
  }
  
  geolocate(){
		this.geolocationService.geolocate();
		this.geolocationService.getCoords().then(
		    (position) => {
		        console.log(position);
		        //alert(JSON.stringify(position));

		      this.data.x = position.coords.longitude;
					this.data.y = position.coords.latitude;
					this.bangunanForm.value['x'] = position.coords.longitude;
					this.bangunanForm.value['y'] = position.coords.latitude;
		    }, (error) => {
		    	this.error = JSON.stringify(error);
		    }
		);
	}

	geolocate2(){
		if(this.geolocation){
	      //this.data.gpsinfo = "Mencari Lokasi....";
	      this.geolocation.getCurrentPosition().then((position) => {
	        
	        this.data.x = position.coords.longitude;
	        this.data.y = position.coords.latitude;
	        //this.data.gpsinfo = "latitude :"+this.y+" longitude :"+this.x;
					this.bangunanForm.value['x'] = position.coords.longitude;
					this.bangunanForm.value['y'] = position.coords.latitude;
	      }, (err) => {
	        console.log(err);
	      });
	    }
	    this.geolocation.getCurrentPosition().then((resp) => {
		// resp.coords.latitude
		// resp.coords.longitude
		 this.data.x = resp.coords.longitude;
	     this.data.y = resp.coords.latitude;
		}).catch((error) => {
		  console.log('Error getting location', error);
		  this.error = JSON.stringify(error);
		});

		let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
		 // data can be a set of coordinates, or an error (if an error occurred).
		 // data.coords.latitude
		 // data.coords.longitude

		});
	}

	changeProvinsi(provinsi){
	  	this.dbsetting.getAllKabupaten(provinsi).subscribe((data)=>{
	      this.allKabupaten=data;
	      //console.log(data);
	      },function (error){
	        console.log("error"+error)
	      },function(){
	        //loadingdata.dismiss();
	      }
	    );
	}
		
	changeKabupaten(kabupaten){
	  	this.dbsetting.getAllKecamatan(kabupaten).subscribe((data)=>{
	      this.allKecamatan=data;
	      //console.log(data);
	      },function (error){
	        console.log("error"+error)
	      },function(){
	        //loadingdata.dismiss();
	      }
	    );
	}
		
	changeKecamatan(kecamatan){
	  	this.dbsetting.getAllDesa(kecamatan).subscribe((data)=>{
	      this.allKelurahan=data;
	      //console.log(data);
	      },function (error){
	        console.log("error"+error)
	      },function(){
	        //loadingdata.dismiss();
	      }
	    );
	}

}
