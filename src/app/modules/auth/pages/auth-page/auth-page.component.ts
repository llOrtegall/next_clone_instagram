import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent  implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  constructor(){}

  ngOnInit(): void {
      
  }
}
