import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoaderComponent,
    ToastComponent,
    PagenotfoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoaderComponent,
    ToastComponent,
    PagenotfoundComponent
  ]
})
export class CoreModule { }
