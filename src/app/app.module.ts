import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTES } from './app.routes';

//Modules
import { PageModule } from './pages/pages.modules';

//cOMPONENTeS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiginComponent } from './ligin/ligin.component';
import { RegisterComponent } from './ligin/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LiginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    PageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
