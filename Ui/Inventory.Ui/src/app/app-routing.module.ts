import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StorageLocationsListComponent
} from "./features/storageLocations/storage-locations-list/storage-locations-list.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {authGuard} from "./features/auth/guards/auth.guard";

const routes: Routes = [
  { path: 'admin/storageLocation', component: StorageLocationsListComponent , canActivate: [authGuard]},

  {path:'login',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
