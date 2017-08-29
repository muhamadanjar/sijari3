import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {
  firedata = firebase.database().ref("/users")
  constructor(public afireauth: AngularFireAuth) {
    
  }

  addUser(newUser){
  	var promise = new Promise((resolve,reject) =>{
  		this.afireauth.auth.createUserWithEmailAndPassword(newUser.email,newUser.password).then(()=>{
  			this.afireauth.auth.currentUser.updateProfile({
  				displayName: newUser.displayName,
  				photoURL:''
  			}).then(()=>{
  				this.firedata.child(this.afireauth.auth.currentUser.uid).set({
  					uid:this.afireauth.auth.currentUser.uid,
  					displayName: newUser.displayName,
            photoURL:'',
            level:10
  				}).then(()=>{
  					resolve({success:true});
  				}).catch((err)=>{
  					reject(err);
  				})
  			}).catch((err) =>{
  				reject(err);
  			})
  		}).catch((err) =>{
  			reject(err);
  		})
  	});

  	return promise;
  }

  passswordreset(email){
    var promise = new Promise((resolve,reject)=>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        resolve({success:true});
      }).catch((err)=>{
        reject(err);
      });
    });

    return promise;
	}
	
	
	updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.afireauth.auth.currentUser.updateProfile({
              displayName: this.afireauth.auth.currentUser.displayName,
              photoURL: imageurl      
          }).then(() => {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
              displayName: this.afireauth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
             })  
      })
      return promise;
	}
		
	
	getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
			console.log(firebase.auth().currentUser.uid,snapshot.val());
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
	}
	
	
	updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afireauth.auth.currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


}
