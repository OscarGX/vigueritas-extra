import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public alertErrorMsg: string = '';
  public alertErrorFlag: boolean = false;
  public isLoading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  //#region Form Getters

  get isUsernameValid(): boolean {
    const usernameField = this.form.get('username');
    if (usernameField !== null) {
      return usernameField.invalid && usernameField.touched;
    }
    return false;
  }

  get isPasswordValid(): boolean {
    const usernameField = this.form.get('password');
    if (usernameField !== null) {
      return usernameField.invalid && usernameField.touched;
    }
    return false;
  }

  //#endregion

  login(): void {
    this.alertErrorMsg = '';
    this.alertErrorFlag = false;
    if (this.form.invalid) {
      this.alertErrorMsg = 'El formulario no es válido';
      this.alertErrorFlag = true;
      return;
    }
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.subscription.add(this.adminService.login(username, password).subscribe(data => {
      if (data.length > 0) {
        this.router.navigateByUrl('/principal');
      } else {
        this.alertErrorMsg = 'Correo o contraseña incorrectos.';
        this.alertErrorFlag = true;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
