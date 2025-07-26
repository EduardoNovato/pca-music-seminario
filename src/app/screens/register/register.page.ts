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
import { registerCredentials } from '../../core/models/auth.model';

const VALIDATOR_MESSAGES: Record<string, { type: string; message: string }[]> =
  {
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
  register!: FormGroup;
  showPassword = false;

  errorMessage: any = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastController: ToastController,
    private readonly authService: AuthService,
    private readonly navCtrl: NavController,
    private readonly storageService: StorageService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.register = this.formBuilder.group({
      name: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async presentToast(field: string) {
    const control = this.register.get(field);
    if (!control || !control.touched || control.valid) return;

    const error = VALIDATOR_MESSAGES[field].find((v) =>
      control.hasError(v.type)
    );
    if (!error) return;

    const toast = await this.toastController.create({
      message: error.message,
      duration: 1500,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async registerUser(credentials: registerCredentials) {
    try {
      await this.authService.registerUser(credentials);

      this.storageService.set('name', credentials.name);
      this.storageService.set('last_name', credentials.last_name);
      this.storageService.set('email', credentials.email);
      this.storageService.set('password', credentials.password);

      this.navCtrl.navigateForward('/login');

      this.storageService.set('registered', true);
    } catch (error) {
      this.errorMessage = error;

      this.storageService.set('registered', false);
    }
  }
}
