import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule, NavController, ToastController } from '@ionic/angular';

import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { authCredentials } from '../../core/models/auth.model';

export const VALIDATOR_MESSAGES: Record<
  string,
  { type: string; message: string }[]
> = {
  name: [{ type: 'required', message: 'Nombre obligatorio' }],
  apellido: [{ type: 'required', message: 'Apellido obligatorio' }],
  email: [
    { type: 'required', message: 'Email obligatorio' },
    { type: 'email', message: 'Email no válido' },
  ],
  password: [
    { type: 'required', message: 'Password obligatorio' },
    {
      type: 'minlength',
      message: 'La contraseña no puede ser menor a 8 caracteres',
    },
  ],
};

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RegisterPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async presentToast(field: string): Promise<void> {
    const control = this.loginForm.get(field);
    if (!control || !control.touched || control.valid) return;

    const fieldErrors = VALIDATOR_MESSAGES[field];
    if (!fieldErrors) return;

    const error = fieldErrors.find((v) => control.hasError(v.type));
    if (!error) return;

    const toast = await this.toastController.create({
      message: error.message,
      duration: 1500,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }

  registerUser(credentials: authCredentials) {}
}
