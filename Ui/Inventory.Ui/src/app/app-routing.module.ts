import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StorageLocationsListComponent} from "./features/storageLocations/storage-locations-list/storage-locations-list.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {authGuard} from "./features/auth/guards/auth.guard";
import {ProductListComponent} from "./features/products/product-list/product-list.component";
import {InventoryListComponent} from "./features/inventory/inventory-list/inventory-list.component";
import {
  InventorySummaryListComponent
} from "./features/inventory_summary/inventory-summary-list/inventory-summary-list.component";
import {
  InventorySummaryDetailComponent
} from "./features/inventory_summary_detail/inventory-summary-detail/inventory-summary-detail.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {HomeListComponent} from "./features/home/home-list/home-list.component";


const routes: Routes = [
  { path: 'admin/storageLocation', component: StorageLocationsListComponent , canActivate: [authGuard]},
  { path: 'admin/product', component: ProductListComponent , canActivate: [authGuard]},
  {path:'admin/inventory',component: InventoryListComponent, canActivate: [authGuard]},
  {path:'admin/inventorySummary',component: InventorySummaryListComponent, canActivate: [authGuard]},
  {path:'admin/inventorySummaryDetail',component: InventorySummaryDetailComponent, canActivate: [authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',component: HomeListComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
