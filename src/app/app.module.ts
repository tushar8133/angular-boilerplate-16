import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as State from './store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(State.StoreReducer,  {
      initialState: State.localStorageState,
      metaReducers: State.metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
