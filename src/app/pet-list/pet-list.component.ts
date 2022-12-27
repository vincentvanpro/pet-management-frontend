import {Component, OnInit} from '@angular/core';
import {Pet} from "../service/pet";
import {PetService} from "../service/pet.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";
import {User} from "../authentication/user";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  pets: Pet[];
  user: User;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private petService: PetService, private router: Router,
              private authService : AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language: {
        searchPlaceholder: 'Type to search..'
      },
      columnDefs: [
        {
          'searchable'    : false,
          'targets'       : [6] // disable search for actions column
        }
      ]
    };

    this.getPets();
  }

  public getPets(): void {
    this.petService.getPets().subscribe({
      next: (response: Pet[]) => {
        this.pets = response;
        this.dtTrigger.next(null);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  editPet(id: number) {
    this.router.navigate(['update-pet', id]);
  }

  logout() {
    this.authService.logout();
  }

}
