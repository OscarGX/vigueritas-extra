import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { IGuia, IGuiaRequest } from '../models/interfaces/guia.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  private guiasCollection!: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.guiasCollection = this.db.collection<IGuia>('Guias');
  }

  public getGuias(): Observable<IGuia[]> {
    return this.db.collection<IGuia>('Guias').valueChanges({idField: 'id'});
  }

  public getGuiaById(id: string): Observable<IGuia | null> {
    return this.guiasCollection.doc<IGuia>(id).snapshotChanges().pipe(
      map(resp => {
        if (resp.payload.exists) {
          const data = resp.payload.data() as IGuia;
          data.id = resp.payload.id;
          return data;
        }
        return null;
      })
    );
  }

  public newGuia(guia: IGuiaRequest): Promise<DocumentReference<DocumentData>> {
    return this.guiasCollection.add(guia);
  }

  public editGuia(guia: IGuia): Promise<void> {
    return this.guiasCollection.doc(guia.id).update(guia);
  }

  public deleteGuia(id: string): Promise<void> {
    return this.guiasCollection.doc(id).delete();
  }
}
