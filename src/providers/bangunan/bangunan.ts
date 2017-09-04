import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingProvider } from '../setting/setting';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from "angularfire2/database";

export class Item {
  $key: string;
  title: string;
  body: string;
  timeStamp: number;
  active: boolean = true;
}
@Injectable()
export class BangunanProvider {
  firedata = firebase.database().ref("/kuesionerbangunan");

  private basePath: string = '/items';
  items: FirebaseListObservable<Item[]> = null; //  list of objects
  item: FirebaseObjectObservable<Item> = null; //   single object
  constructor(public http: Http,private db: AngularFireDatabase) {
     this.items = this.db.list('/items');
  }

  getallbangunan() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.once('value', (snapshot) => {
        let bangunan = snapshot.val();
        let temparr = [];
        console.log(snapshot);
        
        for (var key in bangunan) {
          temparr.push(bangunan[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }



  getAllItems() {
    return this.items.map((data) => data.map(x => x as Item));
  }
  deleteItemByKey($key: string) {
    this.items.remove($key);
  }
  addItem(item: Item) {
    this.items.push(item);
  }
  editItem(key: string,item: Item) {
    this.db.object('items/'+key).update(item);
  }
  /*
  getItemsList(query={}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(this.basePath, {
      query: query
    });
    return this.items
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Item> {
    const itemPath =  `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath)
    return this.item
  }



  createItem(item: Item): void  {
    this.items.push(item)
      .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any): void {
    this.items.update(key, value)
      .catch(error => this.handleError(error))
  }
  // Deletes a single item
  deleteItem(key: string): void {
      this.items.remove(key)
        .catch(error => this.handleError(error))
  }
  // Deletes the entire list of items
  deleteAll(): void {
      this.items.remove()
        .catch(error => this.handleError(error))
  }
  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }*/

  

}
