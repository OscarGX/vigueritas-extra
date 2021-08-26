import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IVisitante, IVisitanteRequest } from '../models/interfaces/visitante.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitantesService {

  private visitantesCollection!: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.visitantesCollection = this.db.collection<IVisitante>('Visitantes');
  }

  public getVisitantes(): Observable<IVisitante[]> {
    return this.db.collection<IVisitante>('Visitantes').valueChanges({idField: 'id'});
  }

  public getVisitanteById(id: string): Observable<IVisitante | null> {
    return this.visitantesCollection.doc<IVisitante>(id).snapshotChanges().pipe(
      map(resp => {
        if (resp.payload.exists) {
          const data = resp.payload.data() as IVisitante;
          data.id = resp.payload.id;
          return data;
        }
        return null;
      })
    );
  }

  public newVisitante(visitante: IVisitanteRequest): Promise<DocumentReference<DocumentData>> {
    return this.visitantesCollection.add(visitante);
  }

  public editVisitante(visitante: IVisitante): Promise<void> {
    return this.visitantesCollection.doc(visitante.id).update(visitante);
  }

  public deleteVisitante(id: string): Promise<void> {
    return this.visitantesCollection.doc(id).delete();
  }
}
