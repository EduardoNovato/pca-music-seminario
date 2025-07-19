import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  // Añadir los messages en password
  validator_message = {
    email: [
      {
        type: "required", message: "Email obligatorio"
      },
      {
        type: "email", message: "Email no encontrado"
      }
    ],
    password: [
      {
        type: "required", message: "Password obligatorio"
      },
      {
        type: "minlength", message: "La contraseña no puede ser menor a 8 caracteres"
      }
    ]
  }

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    })
  }

  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  loginUser(credentians: any){
    console.log(credentians)
  }

}
