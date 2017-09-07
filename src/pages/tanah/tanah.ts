import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController, NavParams,Tabs } from 'ionic-angular';
import { tanahData } from './tanahData';
//import {Tanah} from '../../models/tanah';

import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { TanahProvider } from '../../providers/tanah/tanah';
import { SettingProvider } from '../../providers/setting/setting';

import {Storage} from '@ionic/storage';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from '../tabs/tabs';
import {TanahMapPage} from './tanahMap';

export interface Tanaman {
    nama_tanaman: string;  // required field
		satu_tiga: string;
		tiga_sepuluh: string;
		lebih_sepuluh: string;
		foto:string;
}

export interface TanamanHias {
    nama_tanaman: string;  // required field
		batang: string;
		foto:string;
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
	kode_prov;kode_kab;kode_kec;kode_kel;
	allstatuskepemilikantanah;allpemanfaatantanah;

	kuesionerForm: FormGroup;
	
	public profile: any[];
	public statustanah: any[];
	
	@ViewChild(Tabs) tabs: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public geolocation:Geolocation,
		public geolocationService: GeolocationProvider,
		private _fb: FormBuilder,
		public tanahProvider:TanahProvider,
		public dbsetting:SettingProvider,
		public storage:Storage,
		public zone:NgZone,
		db: AngularFireDatabase,
		public afireauth: AngularFireAuth,
	) {
		
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
		/*dbsetting.getallprovinsi().then((res: any) => {
			console.log(res);
      this.allProvinsi=res[0];
   	});*/
		
		this.initForm();
		this.kuesionerForm.patchValue({'id_user':this.afireauth.auth.currentUser.uid});
		
		this.profile = tanahProvider.getPagesProfile();
		this.statustanah = tanahProvider.getPagesStatusTanah();

		var o = this.dbsetting.AdminLTE.options;
		this.dbsetting._init();
		if (o.enableBoxWidget) {
			this.dbsetting.AdminLTE.boxWidget.activate();
		}
			
		this.checkdata(navParams);

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

  ngAfterViewInit() {
		this.geolocate2();
		
	}
	public ngOnInit() {
	}

	initForm(){
		this.kuesionerForm = this._fb.group({
			key: [""],
			lokasi_proyek: ["",Validators.required],
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
        this.tanahProvider.initTanaman(),
			]),
			tanamanhias: this._fb.array([
				this.tanahProvider.initTanamanBatang()
			]),
			tanamanpelindung:this._fb.array([
        this.tanahProvider.initTanaman(),
			]),
			tanamanlain:this._fb.array([
				this.tanahProvider.initTanamanBatang()
			]),
			x:[""],
			y:[""],
		});
	}
	initProfile() {
    return this._fb.group({
      nama_pemilik: [""],
			alamat_pemilik: [""]
    });
	}
	initTanaman() {
    return this.tanahProvider.initTanaman();
	}
	initTanamanBatang(){
		return this.tanahProvider.initTanamanBatang();
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
	checkdata(navParams){
		for (var key in navParams.data) {
			
			if(navParams.data[key] instanceof Array){
				
				if(key == 'tanaman_hortikultura' || key == 'tanamanpelindung'){
					let _arr = navParams.data[key];
					let tarr = this._fb.array([]);
					for(let i=0;i<_arr.length;i++){
						let tanaman = this.initTanaman();
						tanaman.patchValue({
							'nama_tanaman':_arr[i].nama_tanaman,
							'satu_tiga':_arr[i].satu_tiga,
							'tiga_sepuluh':_arr[i].tiga_sepuluh,
							'lebih_sepuluh':_arr[i].lebih_sepuluh,
						});
						tarr.push(tanaman);
					}
					console.log(tarr);
					this.kuesionerForm.setControl(key,tarr);	
				}else if(key == 'tanamanhias' || key == 'tanamanlain'){
					let _arr = navParams.data[key];
					let tarr = this._fb.array([]);
					for(let i=0;i<_arr.length;i++){
						let tanaman = this.initTanamanBatang();
						tanaman.patchValue({
							'nama_tanaman':_arr[i].nama_tanaman,
							'batang':_arr[i].batang,
						});
						tarr.push(tanaman);
					}
					console.log(tarr);
					this.kuesionerForm.setControl(key,tarr);	
					
				}
				
			}else{
				this.kuesionerForm.controls[key] = new FormControl(navParams.data[key]);
			}
		}
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

					this.kuesionerForm.patchValue({'x':position.coords.longitude});
					this.kuesionerForm.patchValue({'y':position.coords.latitude});
					
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

					//this.kuesionerForm.addControl('x',new FormControl(position.coords.longitude));
					//this.kuesionerForm.addControl('y',new FormControl(position.coords.latitude));
					this.kuesionerForm.patchValue({'x':position.coords.longitude});
					this.kuesionerForm.patchValue({'y':position.coords.latitude});
	      }, (err) => {
	        console.log(err);
	      });
	    }
	    this.geolocation.getCurrentPosition().then((resp) => {
		 		this.data.x = resp.coords.longitude;
				this.data.y = resp.coords.latitude;
				this.kuesionerForm.addControl('x',new FormControl(this.data.x));
				this.kuesionerForm.addControl('y',new FormControl(this.data.y));
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

	pinpoint(){
		this.navCtrl.setRoot(TanahMapPage,this.kuesionerForm.value);
	}

	save(){
	
		this.tanahProvider.addTanah(this.kuesionerForm.value);
	}
	addTanah(){
		this.save();
		this.navCtrl.setRoot(TabsPage);
	}
	close(){
		this.navCtrl.setRoot(TabsPage);
	}
	delete(key: string) {   
		this.tanahProvider.deleteTanahByKey(key); 
    this.navCtrl.setRoot(TabsPage);
  }

	changeProvinsi(provinsi){
	  this.dbsetting.getAllKabupaten(provinsi).subscribe((data)=>{
				this.allKabupaten=data;
				this.kode_prov = provinsi;
	      },function (error){
	        console.log("error"+error)
	      },function(){
	        //loadingdata.dismiss();
	      }
		);
			/*this.dbsetting.getallkabupaten(provinsi).then((res:any)=>{
				console.log(res);
				this.allKabupaten = res[0];
			});*/
			
	}
		
	changeKabupaten(kabupaten){
	  	this.dbsetting.getAllKecamatan(kabupaten).subscribe((data)=>{
				this.kode_kab = kabupaten;
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
				this.kode_kec = kecamatan;
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
