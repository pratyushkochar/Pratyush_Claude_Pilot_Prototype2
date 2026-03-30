import { BookingScenarioData } from "@/src/types";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function fmt(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getBookingData(scenario: "eligible" | "ineligible"): BookingScenarioData {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysUntilCheckin = scenario === "eligible" ? 14 : 3;
  const checkIn = addDays(today, daysUntilCheckin);
  const checkOut = addDays(today, daysUntilCheckin + 3);
  const rnplPaymentDue = addDays(checkIn, -2); // 48 hours before
  const freeCancelUntil = addDays(checkIn, -2);

  const pricePerNight = 249;
  const originalPrice = 299;
  const nights = 3;
  const subtotal = pricePerNight * nights;   // 747
  const taxes = 89.10;
  const serviceFee = 10.90;
  const total = subtotal + taxes + serviceFee; // 847.00

  return {
    hotelName: "The Venetian Resort",
    location: "Las Vegas, NV",
    roomType: "Luxury King Suite",
    checkIn,
    checkOut,
    nights,
    pricePerNight,
    originalPrice,
    taxes,
    serviceFee,
    total,
    rnplPaymentDue,
    freeCancelUntil,
    daysUntilCheckin,
    isRNPLEligible: scenario === "eligible",
    amenities: ["pool", "spa", "wifi", "local_parking"],
  };
}

export const AMENITY_LABELS: Record<string, string> = {
  pool: "Pool",
  spa: "Spa",
  wifi: "Free Wifi",
  local_parking: "Valet Parking",
};
