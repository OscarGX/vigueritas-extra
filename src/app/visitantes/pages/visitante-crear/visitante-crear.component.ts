import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitantesService } from '../../services/visitantes.service';
import { Subscription } from 'rxjs';
import { IVisitanteRequest } from '../../models/interfaces/visitante.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitante-crear',
  templateUrl: './visitante-crear.component.html',
  styleUrls: ['./visitante-crear.component.scss']
})
export class VisitanteCrearComponent implements OnInit {

  public form!: FormGroup;
  public alertErrorMsg: string = '';
  public isLoading: boolean = false;
  public areThereErrors: boolean = false;

  constructor(private fb: FormBuilder, private visitantesService: VisitantesService, private router: Router) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numeroAcompanantes: ['', [Validators.required]],
    });
  }

  //#region Form Getters
  get isNombreValid(): boolean {
    const nombreField = this.form.get('nombre');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }

  get isApaValid(): boolean {
    const nombreField = this.form.get('apellidoPaterno');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }

  get isAmaValid(): boolean {
    const nombreField = this.form.get('apellidoMaterno');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }

  get isEmailValid(): boolean {
    const nombreField = this.form.get('email');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }

  get isNumeroAcompanantesValid(): boolean {
    const nombreField = this.form.get('numeroAcompanantes');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }
  //#endregion

  newVisitante(): void {
    this.isLoading = false;
    this.areThereErrors = false;
    if (this.form.valid) {
      this.isLoading = true;
      const visitante: IVisitanteRequest = {
        apellidos: `${this.form.value.apellidoPaterno} ${this.form.value.apellidoMaterno}`,
        email: this.form.value.email,
        nombre: this.form.value.nombre,
        numeroAcompanantes: this.form.value.numeroAcompanantes
      };
      this.visitantesService.newVisitante(visitante).then(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/visitantes');
      }).catch(e => {
        this.isLoading = false;
        this.alertErrorMsg = 'Hubo un error al registrar al visitante';
        this.areThereErrors = true;
      });
    } else {
      this.areThereErrors = true;
      this.alertErrorMsg = 'El formulario no es válido.';
    }
  }

}
