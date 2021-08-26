import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisitantesService } from '../../services/visitantes.service';
import { Subscription } from 'rxjs';
import { IVisitante } from '../../models/interfaces/visitante.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.scss']
})
export class VisitantesComponent implements OnInit, OnDestroy {

  public subscription$: Subscription = new Subscription();
  public visitantes: IVisitante[] = [];

  constructor(private visitantesService: VisitantesService, private router: Router) { }

  ngOnInit(): void {
    this.subscription$.add(this.visitantesService.getVisitantes().subscribe(data => {
      this.visitantes = data;
    }));
  }

  deleteVisitante(id: string): void {
    this.visitantesService.deleteVisitante(id).then(() => {

    }).catch(() => {

    });
  }

  editVisitante(id: string): void {
    this.router.navigateByUrl(`/visitantes/edit/${id}`);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
