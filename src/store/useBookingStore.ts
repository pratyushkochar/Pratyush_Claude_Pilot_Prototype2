"use client";

import { create } from "zustand";
import {
  PaymentMethodType, Scenario, GuestData, BillingData,
  CardData, TripProtectionChoice, FormErrors, ConfirmedBooking,
} from "@/src/types";
import { getBookingData, fmt } from "@/src/mocks/booking";

interface BookingStore {
  scenario: Scenario;
  paymentMethod: PaymentMethodType;
  guest: GuestData;
  billing: BillingData;
  card: CardData;
  tripProtection: TripProtectionChoice;
  agreedToTerms: boolean;
  errors: FormErrors;
  confirmedBooking: ConfirmedBooking | null;

  setScenario: (s: Scenario) => void;
  setPaymentMethod: (m: PaymentMethodType) => void;
  setGuest: (d: Partial<GuestData>) => void;
  setBilling: (d: Partial<BillingData>) => void;
  setCard: (d: Partial<CardData>) => void;
  setTripProtection: (v: TripProtectionChoice) => void;
  setAgreedToTerms: (v: boolean) => void;
  setErrors: (e: FormErrors) => void;
  submit: () => boolean;
  reset: () => void;
}

const EMPTY_GUEST: GuestData = { firstName: "", lastName: "", sameAsCard: false };
const EMPTY_BILLING: BillingData = { streetAddress: "", country: "United States", zipCode: "", city: "", email: "", phone: "", countryCode: "+1" };
const EMPTY_CARD: CardData = { nameOnCard: "", cardNumber: "", expMonth: "", expYear: "", cvv: "" };

function validate(
  paymentMethod: PaymentMethodType,
  guest: GuestData,
  billing: BillingData,
  card: CardData,
  agreed: boolean
): FormErrors {
  const e: FormErrors = {};
  if (!guest.firstName.trim()) e.firstName = "First name is required";
  if (!guest.lastName.trim()) e.lastName = "Last name is required";

  if (paymentMethod === "credit_card" || paymentMethod === "rnpl") {
    if (!card.nameOnCard.trim()) e.nameOnCard = "Name on card is required";
    if (!card.cardNumber.trim() || card.cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Enter a valid 16-digit card number";
    if (!card.expMonth) e.expMonth = "Required";
    if (!card.expYear) e.expYear = "Required";
    if (!card.cvv.trim() || !/^\d{3,4}$/.test(card.cvv)) e.cvv = "Enter valid CVV";
  }

  if (!billing.streetAddress.trim()) e.streetAddress = "Address is required";
  if (!billing.zipCode.trim() || !/^\d{5}$/.test(billing.zipCode)) e.zipCode = "Enter a valid ZIP";
  if (!billing.city.trim()) e.city = "City is required";
  if (!billing.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email))
    e.email = "Enter a valid email address";
  if (!billing.phone.trim() || billing.phone.replace(/\D/g, "").length < 10)
    e.phone = "Enter a valid phone number";
  if (!agreed) e.agreedToTerms = "You must agree to the booking conditions";
  return e;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  scenario: "eligible",
  paymentMethod: "credit_card",
  guest: { ...EMPTY_GUEST },
  billing: { ...EMPTY_BILLING },
  card: { ...EMPTY_CARD },
  tripProtection: "yes",
  agreedToTerms: false,
  errors: {},
  confirmedBooking: null,

  setScenario: (scenario) => {
    const { paymentMethod } = get();
    const data = getBookingData(scenario);
    // If switching to ineligible and RNPL was selected, reset to credit_card
    const newMethod = (scenario === "ineligible" && paymentMethod === "rnpl") ? "credit_card" : paymentMethod;
    set({ scenario, paymentMethod: newMethod, errors: {} });
    void data; // computed for side-effect check
  },

  setPaymentMethod: (paymentMethod) => set({ paymentMethod, errors: {} }),
  setGuest: (d) => set((s) => ({ guest: { ...s.guest, ...d } })),
  setBilling: (d) => set((s) => ({ billing: { ...s.billing, ...d } })),
  setCard: (d) => set((s) => ({ card: { ...s.card, ...d } })),
  setTripProtection: (tripProtection) => set({ tripProtection }),
  setAgreedToTerms: (agreedToTerms) => set({ agreedToTerms }),
  setErrors: (errors) => set({ errors }),

  submit: () => {
    const { paymentMethod, guest, billing, card, agreedToTerms, scenario, tripProtection } = get();
    const errs = validate(paymentMethod, guest, billing, card, agreedToTerms);
    if (Object.keys(errs).length > 0) {
      set({ errors: errs });
      return false;
    }

    const bookingData = getBookingData(scenario);
    const confirmedBooking: ConfirmedBooking = {
      paymentMethod,
      cardLastFour: (paymentMethod === "credit_card" || paymentMethod === "rnpl") ? card.cardNumber.replace(/\s/g, "").slice(-4) : undefined,
      guestName: `${guest.firstName} ${guest.lastName}`,
      email: billing.email,
      hotel: bookingData.hotelName,
      location: bookingData.location,
      checkIn: fmt(bookingData.checkIn),
      checkOut: fmt(bookingData.checkOut),
      nights: bookingData.nights,
      total: bookingData.total,
      rnplPaymentDue: paymentMethod === "rnpl" ? fmt(bookingData.rnplPaymentDue) : undefined,
      tripProtection,
    };

    set({ confirmedBooking, errors: {} });
    return true;
  },

  reset: () => set({
    scenario: "eligible",
    paymentMethod: "credit_card",
    guest: { ...EMPTY_GUEST },
    billing: { ...EMPTY_BILLING },
    card: { ...EMPTY_CARD },
    tripProtection: "yes",
    agreedToTerms: false,
    errors: {},
    confirmedBooking: null,
  }),
}));
