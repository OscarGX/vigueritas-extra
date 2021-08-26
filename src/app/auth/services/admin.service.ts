import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminsCollection!: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.adminsCollection = this.db.collection('Administradores');
  }

  public login(username: string, password: string): Observable<any> {
    return this.db.collection('Administradores', ref => ref.where('username', '==', username) && ref.where('password', '==', password))
      .valueChanges({ idField: 'id' });
  }
}
