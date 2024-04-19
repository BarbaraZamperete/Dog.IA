import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { FooterComponent } from './components/footer/footer.component';
import { CardCachorroComponent } from './components/card-cachorro/card-cachorro.component';



@NgModule({
  declarations: [
    TopnavbarComponent,
    FooterComponent,
    CardCachorroComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    TopnavbarComponent,
    AppMaterialModule,
    FooterComponent,
    CardCachorroComponent
  ]
})
export class SharedModule { }
