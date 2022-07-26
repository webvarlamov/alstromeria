import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { RootNavigationComponent } from './component/root-navigation/root-navigation.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PlanViewModule} from "./view/plan-view/plan-view.module";

@NgModule({
  declarations: [
    AppComponent,
    RootNavigationComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        PlanViewModule
    ],
    exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
