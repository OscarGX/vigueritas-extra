import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZonasService } from '../../../zonas/services/zonas.service';
import { GuiasService } from '../../services/guias.service';
import { IZona } from '../../../zonas/services/models/interfaces/zona.interfaces';
import { Subscription } from 'rxjs';
import { IGuiaRequest } from '../../models/interfaces/guia.interfaces';

@Component({
  selector: 'app-guias-create',
  templateUrl: './guias-create.component.html',
  styleUrls: ['./guias-create.component.scss']
})
export class GuiasCreateComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public alertErrorMsg: string = '';
  public isLoading: boolean = false;
  public areThereErrors: boolean = false;
  public zonas: IZona[] = [];
  private subscription$: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private router: Router, private zonasService: ZonasService,
    private guiasService: GuiasService) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.subscription$.add(this.zonasService.getZonas().subscribe(data => {
      this.zonas = data;
    }));
  }

  private createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      zona: ['', [Validators.required]],
    });
  }

  newGuia(): void {
    this.isLoading = false;
    this.areThereErrors = false;
    if (this.form.valid) {
      this.isLoading = true;
      const guia: IGuiaRequest = {
        apellidos: `${this.form.value.apellidoPaterno} ${this.form.value.apellidoMaterno}`,
        telefono: this.form.value.telefono,
        nombre: this.form.value.nombre,
        zona: this.form.value.zona
      };
      this.guiasService.newGuia(guia).then(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/guias');
      }).catch(e => {
        this.isLoading = false;
        this.alertErrorMsg = 'Hubo un error al registrar al guía';
        this.areThereErrors = true;
      });
    } else {
      this.areThereErrors = true;
      this.alertErrorMsg = 'El formulario no es válido.';
    }
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

  get isTelValid(): boolean {
    const nombreField = this.form.get('telefono');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }

  get isZonaValid(): boolean {
    const nombreField = this.form.get('zona');
    if (nombreField !== null) {
      return nombreField.invalid && nombreField.touched;
    }
    return false;
  }
  //#endregion

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
