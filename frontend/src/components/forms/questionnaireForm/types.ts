import { CityOption } from "../../UI/inputs/autocompleteInput/AutocompleteInput";
export type FormValues = {
  name: string;
  about: string;
  birthDate: Date | null;
  city: CityOption | null;
  gender: string;
  image: File | null;
};

export type SubmitData = {
  name: string;
  about: string;
  birthDate: Date;
  city: string;
  gender: string;
  image: File;
  login: string;
  password: string;
};
