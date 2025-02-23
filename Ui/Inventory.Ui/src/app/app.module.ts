import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { StorageLocationsListComponent } from './features/storageLocations/storage-locations-list/storage-locations-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './features/auth/login/login.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { InventoryListComponent } from './features/inventory/inventory-list/inventory-list.component';
import { InventorySummaryListComponent } from './features/inventory_summary/inventory-summary-list/inventory-summary-list.component';
import { InventorySummaryDetailComponent } from './features/inventory_summary_detail/inventory-summary-detail/inventory-summary-detail.component';
import { ProductAddComponent } from './features/products/product-add/product-add.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeListComponent } from './features/home/home-list/home-list.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StorageLocationsListComponent,
    LoginComponent,
    ProductListComponent,
    InventoryListComponent,
    InventorySummaryListComponent,
    InventorySummaryDetailComponent,
    ProductAddComponent,
    RegisterComponent,
    HomeListComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
