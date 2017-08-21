import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { tanahData } from './tanahData';
//import {Tanah} from '../../models/tanah';

import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { TanahProvider } from '../../providers/tanah/tanah';
import { SettingProvider } from '../../providers/setting/setting';

import {Storage} from '@ionic/storage';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import {HomePage} from '../home/home';


export interface Tanaman {
    nama_tanaman: string;  // required field
		satu_tiga: string;
		tiga_sepuluh: string;
		lebih_sepuluh: string;
}

export interface TanamanHias {
    nama_tanaman: string;  // required field
		batang: string;
}


@Component({
  selector: 'page-tanah',
  templateUrl: 'tanah.html',
	providers:[Geolocation,AngularFireDatabase],

})
export class TanahPage {
  public data = {} as tanahData;
	public error: string;
	
  make: string;
	model: string;
	

	allProvinsi;allKabupaten;allKecamatan;allKelurahan;
	allstatuskepemilikantanah;allpemanfaatantanah;

	kuesionerForm: FormGroup;
	
	public profile: any[];
	public statustanah: any[];

	item: FirebaseObjectObservable<any>;
	items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public geolocation:Geolocation,
		public geolocationService: GeolocationProvider,
		public formBuilder: FormBuilder,
		private _fb: FormBuilder,
		public tanahProvider:TanahProvider,
		public dbsetting:SettingProvider,
		public storage:Storage,
		db: AngularFireDatabase
	) {
		console.log('Storage',this.storage.get('user'));
		this.items = db.list('/kuesionertanah');
		this.allstatuskepemilikantanah = this.tanahProvider.getStatusKepemilikanTanah();
		this.allpemanfaatantanah = this.tanahProvider.getPemanfaatanTanah();
		this.dbsetting.getAllProvinsi().subscribe((data)=>{
      this.allProvinsi=data;
      },function (error){
        console.log("error"+error);

      },function(){
        console.log("Mengambil data kecamatan");
				  
      }
     
		);
		
		this.kuesionerForm = this._fb.group({
			lokasi_proyek: [""],
			kode_prov: [""],
			kode_kab: [""],
			kode_kec: [""],
			kode_kel: [""],
			jorong: [""],
			id_user:[""],
			nama_pemilik: [""],
			alamat_pemilik: [""],

			status_kepemilikan_tanah: [""],
			pemanfaatantanah: [""],
			tanaman_hortikultura: this._fb.array([
        this.initTanaman(),
			]),
			tanamanhias: this._fb.array([this._fb.group({
				nama_tanaman: [""],
				batang: [""]
			})]),
			tanamanpelindung:this._fb.array([
        this.initTanaman(),
			]),
			tanamanlain:this._fb.array([this._fb.group({
				nama_tanaman: [""],
				batang: [""]
			})]),
			
			
		});

		this.profile = tanahProvider.getPagesProfile();
		this.statustanah = tanahProvider.getPagesStatusTanah();
		//console.log(this.item);
		var o = this.dbsetting.AdminLTE.options;
		this.dbsetting._init();
		if (o.enableBoxWidget) {
			this.dbsetting.AdminLTE.boxWidget.activate();
		}
	}
		
	/*setMake(m){
		console.log(m);
		this.make = m;
		this.carForm.value['make'] = m;
		
		let carList = this.carList;
		this.setModelOptions();
		this.cars.forEach(function(car){
			if (car.make == m){
				carList.push(car);
			}
		});
	}

	setModel(m){
		this.model = m;
		this.kuesionerForm.value['model'] = m;
	}

	setModelOptions(){
		let carModels = [];
		let make = this.make;
		if (this.make != null){
			this.cars.forEach(function(car){
				if (car.make == make && carModels.indexOf(car.model) < 0){
					carModels.push(car.model);
				}
			});
			return carModels;
		}
	}*/

  ionViewDidLoad() {
		this.geolocate2();
		
	}
	initProfile() {
    return this._fb.group({
      nama_pemilik: [""],
			alamat_pemilik: [""]
    });
	}
	initTanaman() {
    return this._fb.group({
      nama_tanaman: ["",Validators.required],
			satu_tiga: [""],
			tiga_sepuluh: [""],
			lebih_sepuluh: [""],
    });
	}
	initTanamanBatang(){
		return this._fb.group({
      nama_tanaman: [""],
			batang: [""]
    });
	}

	addHortikultura() {
    const control = <FormArray>this.kuesionerForm.controls['tanaman_hortikultura'];
    control.push(this.initTanaman());
  }
  removeHortikultura(i: number) {
    const control = <FormArray>this.kuesionerForm.controls['tanaman_hortikultura'];
    control.removeAt(i);
	}
	addTanamanhias(){
		const control = <FormArray>this.kuesionerForm.controls['tanamanhias'];
    control.push(this.initTanamanBatang());
	}
	removeTanamanhias(i: number) {
    const control = <FormArray>this.kuesionerForm.controls['tanamanhias'];
    control.removeAt(i);
	}
	addTanamanpelindung(){
		const control = <FormArray>this.kuesionerForm.controls['tanamanpelindung'];
    control.push(this.initTanaman());
	}
	removeTanamanpelindung(i: number) {
    const control = <FormArray>this.kuesionerForm.controls['tanamanpelindung'];
    control.removeAt(i);
	}

	addTanamanlain(){
		const control = <FormArray>this.kuesionerForm.controls['tanamanlain'];
    control.push(this.initTanamanBatang());
	}
	removeTanamanlain(i: number) {
    const control = <FormArray>this.kuesionerForm.controls['tanamanlain'];
    control.removeAt(i);
	}
	public ngOnInit() {
	}
	
	private validateDays(formGroup: FormGroup) {
		for (let key in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(key)) {
				let control: FormControl = <FormControl>formGroup.controls[key];
				if (control.value) {
					return null;
				}
			}
		}

		return {
			validateDays: {
				valid: false
			}
		};
	}

  geolocate(){
		this.geolocationService.geolocate();
		this.geolocationService.getCoords().then(
		    (position) => {
		        console.log(position);
		        //alert(JSON.stringify(position));

		      this.data.x = position.coords.longitude;
					this.data.y = position.coords.latitude;
					this.kuesionerForm.value['x'] = position.coords.longitude;
					this.kuesionerForm.value['y'] = position.coords.latitude;
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
					this.kuesionerForm.value['x'] = position.coords.longitude;
					this.kuesionerForm.value['y'] = position.coords.latitude;
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

	save(){
		console.log(this.kuesionerForm.value);
		this.items.push(this.kuesionerForm.value);
	}

	addTanah(){
		this.save();
		this.navCtrl.setRoot(HomePage);
	}
	
	close(){
		this.navCtrl.setRoot(HomePage);
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


	
	
	addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
	}
	

	

}
