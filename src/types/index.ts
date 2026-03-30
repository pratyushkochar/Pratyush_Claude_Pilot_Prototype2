export type PaymentMethodType =
  | "apple_pay"
  | "google_pay"
  | "credit_card"
  | "paypal"
  | "affirm"
  | "rnpl";

export type Scenario = "eligible" | "ineligible";
export type TripProtectionChoice = "yes" | "no";

export interface GuestData {
  firstName: string;
  lastName: string;
  sameAsCard: boolean;
}

export interface BillingData {
  streetAddress: string;
  country: string;
  zipCode: string;
  city: string;
  email: string;
  phone: string;
  countryCode: string;
}

export interface CardData {
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  nameOnCard?: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  cvv?: string;
  streetAddress?: string;
  zipCode?: string;
  city?: string;
  email?: string;
  phone?: string;
  agreedToTerms?: string;
}

export interface BookingScenarioData {
  hotelName: string;
  location: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  pricePerNight: number;
  originalPrice: number;
  taxes: number;
  serviceFee: number;
  total: number;
  rnplPaymentDue: Date;
  freeCancelUntil: Date;
  daysUntilCheckin: number;
  isRNPLEligible: boolean;
  amenities: string[];
}

export interface ConfirmedBooking {
  paymentMethod: PaymentMethodType;
  cardLastFour?: string;
  guestName: string;
  email: string;
  hotel: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  rnplPaymentDue?: string;
  tripProtection: TripProtectionChoice;
}
