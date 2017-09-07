import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Tanah } from '../../models/tanah';
import { Storage } from '@ionic/storage';
import { SettingProvider } from '../setting/setting';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Injectable()
export class TanahProvider {

  firedata = firebase.database().ref("/kuesionertanah")
  cars: Tanah[] = [];
  public url:string="http://localhost/api/";
  private basePath: string = '/kuesionertanah';
  itanah:FirebaseListObservable<any>;
  constructor(public _http: Http, public storage: Storage,private db: AngularFireDatabase,
    private _fb: FormBuilder,){
    this.mockCars();
    //this.url = s.getUrl();
    this.itanah = this.db.list(this.basePath);
  }
  getAllTasks(){
		return this._http.get(this.url)
		.map((response:Response)=>response.json());
	}
  getCars(){
    return this.storage.get('cars');
  }
  mockCars(){
    let cars = [
      {id: '1', make: 'Ford', model: 'Focus'},
      {id: '2', make: 'Ford', model: 'Escape'},
    ]
    this.storage.set('cars', JSON.stringify(cars));
  }
  getPagesProfile(){
    let pages = [
      {id: '1', field:'nama_pemilik', soal: 'Nama Pemilik', tipe:'essay', isi: ''},
      {id: '2', field:'alamat_pemilik', soal: 'Alamat Pemilik', tipe:'essay', isi: ''},
    ]

    return pages;
  }
  getPagesStatusTanah(){
    let pages = [
      {id: '1', field:'status_kepemilikan_tanah', soal: 'Status kepemilikan tanah', tipe:'pilihan', isi: ''},
      {id: '2', field:'pemanfaatantanah', soal: 'Pemanfaatan Tanah', tipe:'pilihan', isi: ''},
      {id: '3', field:'tanaman_hortikultura', soal: 'Tanaman Hortikultura', tipe:'multiessay', isi: ''},
      {id: '4', field:'tanamanhias', soal: 'Tanaman Hias', tipe:'essay', isi: ''},
      {id: '5', field:'tanamanpelindung', soal: 'Tanaman Pelindung', tipe:'multiessay', isi: ''},
      {id: '6', field:'tanamanlain', soal: 'Tanaman Lainnya', tipe:'multiessay', isi: '',
        soaltambahan:[{field:"pisang"}]
      },
      
    ]

    return pages;
  }
  getStatusKepemilikanTanah(){
    let status = [
      {id: '1', value: 'Sertifikat Hak Milik (SHM)'},
      {id: '2', value: 'Hak Guna Bangunan (HGB)'},
      {id: '3', value: 'Girik'},
      {id: '4', value: 'Tanah publik / tanah negara'},
      {id: '5', value: 'Tanah milik orang lain'},
      {id: '6', value: 'Lainnya'},
    ]

    return status;

  }
  getPemanfaatanTanah(){
    let status = [
      {id: '1', value: 'Sawah'},
      {id: '2', value: 'Kebun'},
      {id: '3', value: 'Makam'},
      {id: '4', value: 'Empang'},
      {id: '5', value: 'Tidak ada'},
      {id: '6', value: 'Lainnya'},
    ]

    return status;

  }

  initForm(formGroup: FormGroup){
		formGroup = this._fb.group({
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
			x:[""],
			y:[""],
		});
	}
  initTanaman() {
    return this._fb.group({
      nama_tanaman: ["",Validators.required],
			satu_tiga: [""],
			tiga_sepuluh: [""],
      lebih_sepuluh: [""],
      foto:[""],
    });
	}
	initTanamanBatang(){
		return this._fb.group({
      nama_tanaman: [""],
      batang: [""],
      foto:[""],
    });
	}
  getalltanah() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.once('value', (snapshot) => {
        let tanah = snapshot.val();
        let temparr = [];
        for (var key in tanah) {
          temparr.push(tanah[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  deleteTanahByKey(key: string) {
    this.itanah.remove(key);
  }
  addTanah(item) {
    this.itanah.push(item).then((item)=>{
      this.itanah.update(item.key, { key: item.key });
    });
  }
  editTanah(key: string,item) {
    console.log(item);
    this.itanah.update(key,item);
  }

  

}
