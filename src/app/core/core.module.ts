import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UnavailableComponent } from './components/unavailable/unavailable.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoaderComponent,
    UnavailableComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
