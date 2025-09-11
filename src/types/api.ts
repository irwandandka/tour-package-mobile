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
};

export interface Pricing {
  adult: number;
  child: number;
  infant: number;
  senior: number;
  level: number;
};

export interface RoomType {
  id: string;
  name: string;
  image: string;
  min_adult: number;
  max_adult: number;
  max_pax: number;
  allotment: number;
  pricing: Pricing[];
};

export interface RoomPriceBreakdown {
  adult: number;
  child: number;
  infant: number;
  senior: number;
  total: number;
};

export interface RoomOrder {
  adult: number;
  child: number;
  infant: number;
  senior: number;
}

export interface BodySaveBooking {
  product_id: string;
  date_from: string;
  date_to: string;
  currency: string;
  product_details: BodySaveProductDetail[];
}

export interface BodySaveProductDetail {
  product_detail: string;
  quantity: number;
  quantity_adult: number;
  quantity_child: number;
  quantity_infant: number;
  quantity_senior: number;
}

export interface Country {
    id: string;
    name: string;
    iso_code: string;
    phone_code: string;
}

export interface City {
    id: string;
    name: string;
    country: string;
    region: string;
}

export interface Passenger {
    title: string;
    first_name: string;
    last_name: string;
    gender?: string;
    type?: "Adult" | "Child" | "Infant" | "Senior";
    roomName?: string;
    birth_date?: string;
    birth_place?: string;
    natinality?: string;
    passport_number?: string;
    passport_expiry_date?: string;
    passport_issue_country?: string;
    passport_issue_date?: string;
}

export interface Transaction {
  id: string;
  code: string;
  status: string;
  product: string;
  total_amount: number;
  booking_date: string;
  from_date: string;
  to_date: string;
  customer_name: string;
  customer_email: string;
  transaction_details: TransactionDetail[];
}

export interface TransactionDetail {
  id: string;
  product_detail_name: string;
  product_detail_image: string;
  quantity_adult: number;
  quantity_child: number;
  quantity_infant: number;
  quantity_senior: number;
  sales_adult: number;
  sales_child: number;
  sales_infant: number;
  sales_senior: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  description: string;
  logo: string;
}

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

export interface Country {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
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

export interface SearchGlobalResponse {
  id: string;
  name: string;
  slug: string;
  type: string;
}

export interface Language {
  name: string;
  code: string;
  logo: string;
}