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
  					photoURL:''
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


}
