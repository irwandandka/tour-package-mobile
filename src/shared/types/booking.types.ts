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

export interface ETicket {
  id: string;
  url: string;
  filename: string;
  ticket_code: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  description: string;
  logo: string;
}

export interface OrderHistory {
  id: string;
  code: string;
  status: string;
  product: string;
  slug: string;
  image: string;
  total_amount: number;
  booking_date: string;
  notes: string;
}

export interface OrderDetail {
  id: string;
  code: string;
  status: string;
  product: string;
  slug: string;
  image: string;
  total_amount: number;
  booking_date: string;
  from_date: string;
  to_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: string;
  notes: string;
  transaction_details: TransactionDetail[];
  eticket: ETicket | null;
}
