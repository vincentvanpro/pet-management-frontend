import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pet} from "./pet";

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiServerUrl = 'api';

  constructor(private http: HttpClient) { }

  public getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiServerUrl}/pets`);
  }

  public getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiServerUrl}/pets/${id}`);
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiServerUrl}/pets`, pet);
  }

  public updatePet(pet: Pet, id: number): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiServerUrl}/pets/${id}`, pet);
  }
}
