import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PetListComponent} from "./pet-list/pet-list.component";
import {CreatePetComponent} from "./create-pet/create-pet.component";
import {UpdatePetComponent} from "./update-pet/update-pet.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./authentication/auth-guard.service";

const routes: Routes = [
  {
    path: 'pets',
    component: PetListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-pet',
    component: CreatePetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'update-pet/:id',
    component: UpdatePetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
