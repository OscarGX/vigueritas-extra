import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGuia } from '../../models/interfaces/guia.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuiasService } from '../../services/guias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IZona } from '../../../zonas/services/models/interfaces/zona.interfaces';
import { ZonasService } from '../../../zonas/services/zonas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guias-edit',
  templateUrl: './guias-edit.component.html',
  styleUrls: ['./guias-edit.component.scss']
})
export class GuiasEditComponent implements OnInit, OnDestroy {

  private id: string = '';
  public guia!: IGuia;
  public form!: FormGroup;
  public alertErrorMsg: string = '';
  public isLoading: boolean = false;
  public areThereErrors: boolean = false;
  public zonas: IZona[] = [];
  private subscription$: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, private guiasService: GuiasService,
    private fb: FormBuilder, private zonasService: ZonasService) { 
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.id = id;
        this.createForm();
      } else {
        this.router.navigateByUrl('/guias');
      }
    }

  ngOnInit(): void {
    this.getZonas();
    this.guiasService.getGuiaById(this.id).subscribe(data => {
      if (data) {
        this.guia = data;
        this.setFormValues();
      } else {
        this.router.navigateByUrl('/guias');
      }
    });
  }

  private getZonas(): void {
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

  editGuia(): void {
    this.isLoading = false;
    this.areThereErrors = false;
    if (this.form.valid) {
      this.isLoading = true;
      const guia: IGuia = {
        id: this.guia.id,
        apellidos: `${this.form.value.apellidoPaterno} ${this.form.value.apellidoMaterno}`,
        nombre: this.form.value.nombre,
        telefono: this.form.value.telefono,
        zona: this.form.value.zona
      };
      this.guiasService.editGuia(guia).then(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/guias');
      }).catch(() => {
        this.isLoading = false;
        this.areThereErrors = true;
        this.alertErrorMsg = 'Hubo un error al editar el registro.';
      });
    } else {
      this.areThereErrors = true;
      this.alertErrorMsg = 'El formulario no es válido.';
    }
  }

  private setFormValues(): void {
    this.form.get('nombre')?.setValue(this.guia.nombre);
    this.form.get('apellidoPaterno')?.setValue(this.guia.apellidos.split(' ')[0]);
    this.form.get('apellidoMaterno')?.setValue(this.guia.apellidos.split(' ')[1]);
    this.form.get('telefono')?.setValue(this.guia.telefono);
    this.form.get('zona')?.setValue(this.guia.zona);
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
