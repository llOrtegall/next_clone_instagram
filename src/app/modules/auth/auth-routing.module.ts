import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path:'login', // http://localhost:4200/auth/login
    component: AuthPageComponent
  },
  {
    path:'**', // http://localhost:4200/auth/login
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
