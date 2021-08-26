import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitantesService } from '../../services/visitantes.service';
import { IVisitante } from '../../models/interfaces/visitante.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-visitante-editar',
  templateUrl: './visitante-editar.component.html',
  styleUrls: ['./visitante-editar.component.scss']
})
export class VisitanteEditarComponent implements OnInit {

  private id: string = '';
  public visitante!: IVisitante;
  public form!: FormGroup;
  public alertErrorMsg: string = '';
  public isLoading: boolean = false;
  public areThereErrors: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private visitantesService: VisitantesService,
    private fb: FormBuilder) { 
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.createForm();
    } else {
      this.router.navigateByUrl('/visitantes');
    }
  }

  ngOnInit(): void {
    this.visitantesService.getVisitanteById(this.id).subscribe(data => {
      if (data) {
        this.visitante = data;
        this.setFormValues();
      } else {
        this.router.navigateByUrl('/visitantes');
      }
    });
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

  private setFormValues(): void {
    this.form.get('nombre')?.setValue(this.visitante.nombre);
    this.form.get('apellidoPaterno')?.setValue(this.visitante.apellidos.split(' ')[0]);
    this.form.get('apellidoMaterno')?.setValue(this.visitante.apellidos.split(' ')[1]);
    this.form.get('email')?.setValue(this.visitante.email);
    this.form.get('numeroAcompanantes')?.setValue(this.visitante.numeroAcompanantes);
  }

  editVisitante(): void {
    this.isLoading = false;
    this.areThereErrors = false;
    if (this.form.valid) {
      this.isLoading = true;
      const visitante: IVisitante = {
        id: this.visitante.id,
        apellidos: `${this.form.value.apellidoPaterno} ${this.form.value.apellidoMaterno}`,
        email: this.form.value.email,
        nombre: this.form.value.nombre,
        numeroAcompanantes: this.form.value.numeroAcompanantes
      };
      this.visitantesService.editVisitante(visitante).then(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/visitantes');
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

}
