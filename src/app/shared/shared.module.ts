import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { FooterComponent } from './components/footer/footer.component';
import { CardCachorroComponent } from './components/card-cachorro/card-cachorro.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    TopnavbarComponent,
    FooterComponent,
    CardCachorroComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    TopnavbarComponent,
    AppMaterialModule,
    FooterComponent,
    CardCachorroComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
