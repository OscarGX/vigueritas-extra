import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IZona } from './models/interfaces/zona.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  private zonasCollection!: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { }

  public getZonas(): Observable<IZona[]> {
    return this.db.collection<IZona>('Zonas').valueChanges({idField: 'id'});
  }
}
