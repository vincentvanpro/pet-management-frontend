import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pet} from "../service/pet";
import {PetService} from "../service/pet.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";
import {User} from "../authentication/user";

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
    type: new FormControl(''),
    furColor: new FormControl(''),
    country: new FormControl(''),
  });
  submitted = false;

  typeObjects : SelectModel[];
  furColorObjects: SelectModel[];
  countryObjects: SelectModel[];

  pet: Pet = {} as Pet;
  user: User;

  constructor(private petService: PetService, private router: Router, private formBuilder: FormBuilder,
              private authService : AuthenticationService) {

    this.typeObjects = [
      {id: 1, name: "Cat"},
      {id: 2, name: "Dog"},
      {id: 3, name: "Horse"},
      {id: 4, name: "Rabbit"},
      {id: 5, name: "Parrot"}
    ]

    this.furColorObjects = [
      {id: 1, name: "Black"},
      {id: 2, name: "White"},
      {id: 3, name: "Brown"},
      {id: 4, name: "Yellow"},
      {id: 5, name: "Blue"}
    ]

    this.countryObjects = [
      {id: 1, name: "Estonia"},
      {id: 2, name: "Latvia"},
      {id: 3, name: "Lithuania"},
      {id: 4, name: "Finland"},
      {id: 5, name: "Sweden"},
      {id: 5, name: "Norway"}
    ]
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(50)
          ]
        ],
        code: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12)
          ]
        ],
        type: ['', [Validators.required]],
        furColor: ['', [Validators.required]],
        country: ['', Validators.required],
      },
    );
  }

  get name() { return this.form.get('name'); }
  get code() { return this.form.get('code'); }
  get type() { return this.form.get('type'); }
  get furColor() { return this.form.get('furColor'); }
  get country() { return this.form.get('country'); }

  savePet() {
    this.petService.addPet(this.pet).subscribe({
      next: (response) => {
        this.navigateToPetList();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  navigateToPetList() {
    this.router.navigate(['/pets']);
  }

  onSubmit() {
    this.pet.owner = this.user
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.savePet();
  }

}

