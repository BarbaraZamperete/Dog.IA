import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { AppMaterialModule } from './app-material/app-material.module';



@NgModule({
  declarations: [
    TopnavbarComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    TopnavbarComponent,
    AppMaterialModule
  ]
})
export class SharedModule { }
