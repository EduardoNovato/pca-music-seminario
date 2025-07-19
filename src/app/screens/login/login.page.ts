import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { authCredentials } from 'src/app/core/models/auth.model';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  errorMessage: string = '';

  validator_message = {
    email: [
      {
        type: 'required',
        message: 'Email obligatorio',
      },
      {
        type: 'email',
        message: 'Email no encontrado',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password obligatorio',
      },
      {
        type: 'minlength',
        message: 'La contraseña no puede ser menor a 8 caracteres',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthService,
    private navController: NavController,
    private storageServcie: StorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  async presentToast(field: 'email' | 'password') {
    const control = this.loginForm.get(field)!;
    if (!control.touched || control.valid) {
      return;
    }

    const error = this.validator_message[field].find((v) =>
      control.hasError(v.type)
    );
    if (error) {
      const toast = await this.toastController.create({
        message: error.message,
        duration: 1500,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  async loginUser(credentians: authCredentials) {
    this.authService
      .loginUser(credentians)
      .then((res) => {
        this.errorMessage = '';
        this.storageServcie.set('login', true);
        this.navController.navigateForward('/intro');
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error(error);
      });
  }
}
