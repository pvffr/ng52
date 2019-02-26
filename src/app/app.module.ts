import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UpgradeModule } from '@angular/upgrade/static';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';

export class CustomHandlingStrategy implements UrlHandlingStrategy {
 shouldProcessUrl(url) {
    const shouldProcess = url.toString().includes("/home");
    console.log('CustomHandliongStrategy.shouldProcessUrl url: ', url.toString());
    console.log('CustomHandliongStrategy.shouldProcessUrl shouldProcess: ', shouldProcess);
    return shouldProcess;
  }

  extract (url) {
    return url;
  }

  merge(url, whole) {
    return url;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    AppRoutingModule,
    RouterModule.forRoot([
        {
          path: 'home',
          component: HomeComponent
        }
      ],
      {
        useHash: false
      }
    )
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass:  CustomHandlingStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
