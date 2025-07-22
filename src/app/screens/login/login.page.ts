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
import { loginCredentials } from '../../core/models/auth.model';

const VALIDATOR_MESSAGES: Record<string, { type: string; message: string }[]> =
  {
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  errorMessage: any = '';

  private readonly validatorMessages = VALIDATOR_MESSAGES;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastController: ToastController,
    private readonly authService: AuthService,
    private readonly navController: NavController,
    private readonly storageService: StorageService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async presentToast(field: 'email' | 'password') {
    const control = this.loginForm.get(field);
    if (!control || !control.touched || control.valid) return;

    const error = this.validatorMessages[field].find((v) =>
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

  async loginUser(credentials: loginCredentials) {
    try {
      await this.authService.loginUser(credentials);
      this.errorMessage = '';
      this.storageService.set('login', true);
      this.navController.navigateForward('/intro');
    } catch (error) {
      this.errorMessage = error;
      console.error(error);
      this.storageService.set('login', false);
    }
  }
}
