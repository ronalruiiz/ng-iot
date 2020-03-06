import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: AngularFireDatabase) {
    }

    public getAllData() {
        return this.firestore.object('casa').valueChanges();
    }

    public getTypeData(type, space) {
        return this.firestore.object(`${space}/${type}`).valueChanges();
    }

    public filterFrom(value,type){
        return this.firestore.object('casa/temp').query.equalTo('fef')
    }
}
