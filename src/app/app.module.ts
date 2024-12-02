import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralInterceptor } from './core/general.interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,  ToastrModule.forRoot(), BrowserAnimationsModule, ],
  providers: [{
  provide: HTTP_INTERCEPTORS,
  useClass: GeneralInterceptor,
  multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
