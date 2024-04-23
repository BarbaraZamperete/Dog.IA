import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';
import { CriarCachorroComponent } from './pages/criar-cachorro/criar-cachorro.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { CachorrosComponent } from './pages/cachorros/cachorros.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro/usuario', component: CriarUsuarioComponent },
  { path: 'cadastro/cachorro/:tipo', component: CriarCachorroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resultados/:id', component: ResultadosComponent },
  { path: 'cachorros', component: CachorrosComponent },
  { path: 'sobre', component: SobreComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
