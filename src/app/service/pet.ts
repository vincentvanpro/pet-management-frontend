import {User} from "../authentication/user";

export interface Pet {
  id: number;
  name: string;
  code: number;
  type: string;
  furColor: string;
  country: string;
  owner: User;
}
