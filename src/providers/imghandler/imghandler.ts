import { Injectable,ElementRef } from '@angular/core';
import {Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';
import { SettingProvider } from "../setting/setting";

@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();
  public error: string;
  public myPhoto: any;
  public myPhotoURL: any;
  constructor(public filechooser: FileChooser,public camera: Camera,public setting:SettingProvider) {
  }
 
  uploadimage() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                  imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
     return promise;   
  }

  picmsgstore() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var uuid = this.guid();
                  var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
                  imageStore.put(imgBlob).then((res) => {
                      resolve(res.downloadURL);
                    }).catch((err) => {
                        reject(err);
                    })
                  .catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
     return promise;   
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      //this._uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      //this._uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  takePhotoHortikura(){
    var promise = new Promise((resolve, reject) => {
      const options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(base64Image);
        resolve(base64Image);
      }, (err) => {
        reject(err);
      });
    });

    return promise;
    
  }

  /*public _uploadPhoto(imageData: any): void {
      this.error = null;
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...'
      });

      this.loading.present();
      /*this.file.resolveLocalFilesystemUrl(imageData)
        .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
        .catch(err => console.log(err));

      const fileTransfer: FileTransferObject = this.transfer.create();
      let namafile = this.data.kode_kel+"_"+this.randomString(24)+'.jpg';
      let options1: FileUploadOptions = {
        fileKey: 'file',
        fileName: namafile,
        headers: {}
      }
      let image = '/api/pjuuploadimage';

      fileTransfer.upload(imageData, this.rootUrl+'/php/upload.php',options1)
        .then((data) => {
        // success
        alert("success");
        this.data.foto = namafile;
        this.loading.dismiss();
      }, (err) => {
        // error
        alert("error"+JSON.stringify(err));
        this.handleError(err);
        this.loading.dismiss();
      });
  
  }*/

  convertImgToDataURLviaCanvas(url, callback, outputFormat) {
    /*var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;*/
  }
  
  convertFileToDataURLviaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  uploadbase64(url,callback){
    (<any>window).resolveLocalFileSystemURL(url, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsDataURL(resFile);
        reader.onloadend = (evt: any) => {
          callback(evt.target.result);
        }
      })
    })
  }

  filereadertostorage(url,callback){
    (<any>window).resolveLocalFileSystemURL(url, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          callback(evt.target.result);
        }
      })
    })
  }
  _uploadbase64(options,folder=''){
    var promise = new Promise((resolve,reject)=>{
      this.camera.getPicture(options).then((imageData) => {
        (<any>window).resolveLocalFileSystemURL(imageData, (res) => {
          res.file((resFile) => {
            var reader = new FileReader();
            reader.readAsDataURL(resFile);
            reader.onloadend = (evt: any) => {
              resolve(evt.target.result);
            }
          })
        })
        
      }, (err) => {
        reject(err);    
        this.error = JSON.stringify(err);
      });
    });

    return promise;
  }

  upload(options,folder){
    var promise = new Promise((resolve,reject)=>{
      this.camera.getPicture(options).then((imageData) => {
        (<any>window).resolveLocalFileSystemURL(imageData, (res) => {
          res.file((resFile) => {
            var reader = new FileReader();
            reader.readAsArrayBuffer(resFile);
            reader.onloadend = (evt: any) => {
              var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
              var randomStr = this.setting.randomString(50);
              var img_combine = firebase.auth().currentUser.uid+'_'+randomStr;
              var imageStore = this.firestore.ref(folder).child(img_combine);
              imageStore.put(imgBlob).then((res) => {
                this.firestore.ref(folder).child(img_combine).getDownloadURL().then((url) => {
                  resolve(url);
                }).catch((err) => {
                    reject(err);
                })
              }).catch((err) => {
                reject(err);
              })
            }
          })
        })
        
      }, (err) => {
        reject(err);    
        this.error = JSON.stringify(err);
      });
    });

    return promise;
  }
 
}