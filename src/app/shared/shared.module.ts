import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    TopnavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    TopnavbarComponent,
    AppMaterialModule,
    FooterComponent
  ]
})
export class SharedModule { }
