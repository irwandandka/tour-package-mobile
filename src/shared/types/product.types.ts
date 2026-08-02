import { ApiResponse } from "../api/types";

export type ProductDetailResponse = ApiResponse<ProductDetail>;

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  rating: number;
  location: string;
  itineraries: Itinerary[];
  reviews: Review[];
}

export interface Itinerary {
  id: string;
  title: string;
  day: number;
  caption: string;
  description: string;
  schedule_time: string;
  latitude: string;
  longitude: string;
}

export interface Review {
  id: string;
  user: string;
  email: string;
  profile_picture_url: string | null;
  rating: number;
  comment: string;
  review_date: string;
}

export interface AvailablePeriod {
  label: string;
  value: string;
}

export interface AvailableDate {
  id: number;
  date_start: string;
  date_end: string;
  date_start_iso: string;
  date_end_iso: string;
  price: string;
  allotment?: number;
}

export interface Room {
  id: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  priceSenior: number;
  total: number;
  adult: number;
  child: number;
  infant: number;
  senior: number;
}

export interface Pricing {
  adult: number;
  child: number;
  infant: number;
  senior: number;
  level: number;
}

export interface RoomType {
  id: string;
  name: string;
  image: string;
  min_adult: number;
  max_adult: number;
  max_pax: number;
  allotment: number;
  pricing: Pricing[];
}

export interface RoomPriceBreakdown {
  adult: number;
  child: number;
  infant: number;
  senior: number;
  total: number;
}

export interface RoomOrder {
  adult: number;
  child: number;
  infant: number;
  senior: number;
}
