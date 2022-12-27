import {Component, OnInit} from '@angular/core';
import {Pet} from "../service/pet";
import {PetService} from "../service/pet.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  pets: Pet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPets();
  }

  public getPets(): void {
    this.petService.getPets().subscribe({
      next: (response: Pet[]) => {
        this.pets = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
