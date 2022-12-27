import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CreatePetComponent } from './create-pet/create-pet.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdatePetComponent } from './update-pet/update-pet.component';
import { DataTablesModule } from "angular-datatables";
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./authentication/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    PetListComponent,
    CreatePetComponent,
    UpdatePetComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
