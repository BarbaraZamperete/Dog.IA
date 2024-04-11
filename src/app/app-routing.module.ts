import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro/usuario', component: CriarUsuarioComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
