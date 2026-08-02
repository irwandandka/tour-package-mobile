import { Country, City } from "./location.types";

export interface UserLogin {
  id: string;
  name: string;
  email: string;
  username: string;
  profile_picture_url: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  profile_picture_url: string;
  address: string;
  phone: string;
  birth_date: string;
  gender: string;
  email_verified_at: string;
  country: Country | null;
  city: City | null;
}

export interface UserProfileRequest {
  name: string;
  email: string;
  username: string;
  address: string;
  phone: string;
  birth_date: string;
  gender: string;
  country: Country | null;
  city: City | null;
}
