import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { TabsPage } from '../tabs/tabs';
import { BangunanMapPage } from './bangunanMap';
import { SettingProvider } from '../../providers/setting/setting';
import { Storage } from '@ionic/storage';
import { bangunanData } from './bangunanData';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-bangunan',
  templateUrl: 'bangunan.html',
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
    public db: AngularFireDatabase,
    private _fb: FormBuilder,
    public geolocation:Geolocation,
		public geolocationService: GeolocationProvider) {
      this.items = db.list('/kuesionerbangunan');
      this.initForm();
      this.dbsetting.getAllProvinsi().subscribe((data)=>{
        this.allProvinsi=data;
        },function (error){
          console.log("error"+error);
        },function(){
          console.log("Mengambil data kecamatan");
        }
      );
      var o = this.dbsetting.AdminLTE.options;
      this.dbsetting._init();
      if (o.enableBoxWidget) {
        this.dbsetting.AdminLTE.boxWidget.activate();
      }

      if(navParams.data.lokasi_proyek){
        this.bangunanForm.setValue(navParams.data);
      }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BangunanPage');
  }

  ngAfterContentInit() {
    this.geolocate();
    
  }

  addBangunan(bangunan: bangunanData){
    console.log(this.bangunanForm.value);
    
		this.items.push(this.bangunanForm.value).then((item)=>{
      console.log(item.key);
      this.items.update(item.key, { key: item.key });
    });
		this.navCtrl.setRoot(TabsPage);
  }

  close(){
		this.navCtrl.setRoot(TabsPage);
  }

  initForm(){
    this.bangunanForm = this._fb.group({
        key: [""],  
        lokasi_proyek: ["",Validators.required],
        kode_prov: [""],
        kode_kab: [""],
        kode_kec: [""],
        kode_kel: [""],
        jorong: [""],

        id_user:[""],
        nama: [""],
        alamat: [""],
        jenis_kelamin:[""],
        usia: [""],
        pendidikanterakhir: [""],
        statusrumahtangga: [""],
        lamatinggal: [""],

        jumlahorang: [""],
        jumlahkk: [""],
        statuskependudukan:[""],
        kepemilikanktp:[""],
        kepemilikankk:[""],

        statuskepemilikantanah: [""],
        statuskepemilikanrumah: [""],
        namapemilik:[""],
        alamatpemilik:[""],
        hargasewaperbulan:[""],
        jeniskontruksi:[""],
        strukpbb:[""],
        luasbumi:[""],
        luasbangunan:[""],
        kepemilikansuratimb:[""],
        pemanfaatanbangunan:[""],
        sumberpenerangan:[""],
        sambungantelpkabel:[""],
        jenispagarrumah:[""],
        panjangpagar:[""],
        kepemilikansumurmataair:[""],
        kepemilikanrumahlain:[""],
        kepemilikantanahlain:[""],
        lokasitanahditempatlain:[""],
        
        pekerjaanutama:[""],
        pekerjaansampingan:[""],
        totalpendapatanperbulan:[""],
        totalpengeluaranperbulan:[""],

        pengetahuanrespondenirigasi:[""],
        sumberinformasi:[""],
        kesediandirekolasi:[""],
        alasanpenolakanrelokasi:[""],
        bentukpergantiandisukai:[""],
        pendapatrespondenpemindahankolektif:[""],
        x:[""],
        y:[""],
      });
  }

  pinpoint(){
		this.navCtrl.setRoot(BangunanMapPage,this.bangunanForm.value);
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
