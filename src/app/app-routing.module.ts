import { MainComponent } from './pages/template/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { PersonaDetailComponent } from './pages/persona/persona-detail/persona-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[ AuthGuard ]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate:[ AuthGuard ]
  },
  {
    path: 'persona',
    component: PersonaComponent,
    canActivate:[ AuthGuard ]
  },
  {
    path: 'detail-persona/:id',
    component: PersonaDetailComponent,
    canActivate:[ AuthGuard ]
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
