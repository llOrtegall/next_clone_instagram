import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  constructor(private _authServices: AuthService) { }
  ngOnInit(): void {

    this.formLogin = new FormGroup({
      email: new FormControl('', [
        //Aquí podemos colocar las validaciones
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  //*Enviar login captura la inf del form
  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this._authServices.sendCredentials(email, password);
  }
}
