import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CriarCachorroComponent } from './pages/criar-cachorro/criar-cachorro.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientXsrfModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { CachorrosComponent } from './pages/cachorros/cachorros.component';
import { SobreComponent } from './pages/sobre/sobre.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CriarUsuarioComponent,
    CriarCachorroComponent,
    LoginComponent,
    DashboardComponent,
    ResultadosComponent,
    CachorrosComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'csrftoken', headerName: 'X-CSRFToken' })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
