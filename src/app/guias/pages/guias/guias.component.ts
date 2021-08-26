import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGuia } from '../../models/interfaces/guia.interfaces';
import { Subscription } from 'rxjs';
import { GuiasService } from '../../services/guias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.scss']
})
export class GuiasComponent implements OnInit, OnDestroy {

  public guias: IGuia[] = [];
  private subscription$: Subscription = new Subscription();

  constructor(private guiasService: GuiasService, private router: Router) { }

  ngOnInit(): void {
    this.subscription$.add(this.guiasService.getGuias().subscribe(data => {
      this.guias = data;
    }));
  }

  public editGuia(id: string): void {
    this.router.navigateByUrl(`/guias/edit/${id}`);
  }

  public deleteGuia(id: string): void {
    this.guiasService.deleteGuia(id).then(() => {

    }).catch(() => {

    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
