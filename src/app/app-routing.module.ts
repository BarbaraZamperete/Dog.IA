import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { CriarCachorroComponent } from './criar-cachorro/criar-cachorro.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro/usuario', component: CriarUsuarioComponent },
  { path: 'cadastro/cachorro', component: CriarCachorroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
