export interface ProductDetailResponse {
  status: string;
  data: ProductDetail;
}

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