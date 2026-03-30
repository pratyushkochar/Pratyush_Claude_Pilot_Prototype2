"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBookingStore } from "@/src/store/useBookingStore";

export default function ConfirmationPage() {
  const router = useRouter();
  const { confirmedBooking, reset } = useBookingStore();

  useEffect(() => {
    if (!confirmedBooking) router.replace("/");
  }, [confirmedBooking, router]);

  if (!confirmedBooking) return null;

  const isRNPL = confirmedBooking.paymentMethod === "rnpl";
  const isAffirm = confirmedBooking.paymentMethod === "affirm";

  // Derive headline + summary text
  let headline: string;
  let subheadline: string;
  let iconName: string;
  let iconColor: string;
  let amountText: string;

  if (isRNPL) {
    headline = "Booking Reserved!";
    subheadline = confirmedBooking.cardLastFour
      ? `No charge today. Your card ending in ${confirmedBooking.cardLastFour} will be charged $${confirmedBooking.total.toFixed(2)} on ${confirmedBooking.rnplPaymentDue}.`
      : "Your room is held. No payment collected today.";
    iconName = "event_available";
    iconColor = "text-success-8";
    amountText = "$0.00 charged today";
  } else if (isAffirm) {
    headline = "Booking Confirmed!";
    subheadline = "Your first payment has been processed with Affirm.";
    iconName = "check_circle";
    iconColor = "text-success-8";
    amountText = `First payment of $${(confirmedBooking.total / 4).toFixed(2)} charged today`;
  } else {
    headline = "Booking Confirmed!";
    subheadline = confirmedBooking.cardLastFour
      ? `Your card ending in ${confirmedBooking.cardLastFour} has been charged.`
      : "Your payment has been processed.";
    iconName = "check_circle";
    iconColor = "text-success-8";
    amountText = `$${confirmedBooking.total.toFixed(2)} charged`;
  }

  function handleStartOver() {
    reset();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-primary-2">
      {/* Header */}
      <header className="bg-white border-b border-primary-6">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-heading5 text-primary-11 font-bold tracking-tight select-none">priceline</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary-11">lock</span>
            <span className="text-label2 text-primary-11 uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Step 3 active */}
      <div className="bg-white border-b border-primary-6">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-center gap-0">
          {[
            { n: 1, label: "Choose Room" },
            { n: 2, label: "Guest & Payment Details" },
            { n: 3, label: "Booking Confirmation" },
          ].map((step, i) => {
            const isActive = step.n === 3;
            const isComplete = step.n < 3;
            const isLast = i === 2;
            return (
              <div key={step.n} className="flex items-center">
                <div className="flex items-center gap-2">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-label3 shrink-0
                    ${isComplete || isActive ? "bg-primary-9 text-white" : "bg-primary-2 text-primary-10 border border-primary-6"}`}>
                    {isComplete ? <span className="material-symbols-outlined text-[14px]">check</span> : step.n}
                  </span>
                  <span className={`text-label2 whitespace-nowrap ${isActive ? "text-primary-9" : "text-primary-10"}`}>
                    {step.label}
                  </span>
                </div>
                {!isLast && <div className={`mx-3 h-[2px] w-12 shrink-0 ${step.n < 3 ? "bg-primary-9" : "bg-primary-6"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Hero confirmation card */}
        <div className={`bg-white rounded-lg border overflow-hidden shadow-[0px_1px_3px_rgba(13,15,20,0.1)]
          ${isRNPL ? "border-success-8" : "border-success-4"}`}
        >
          <div className={`px-6 py-5 flex items-center gap-4 ${isRNPL ? "bg-success-3 border-b border-success-4" : "bg-success-3 border-b border-success-4"}`}>
            <span className={`material-symbols-outlined text-[48px] ${iconColor}`}>{iconName}</span>
            <div>
              <h1 className="text-heading3 text-primary-13">{headline}</h1>
              <p className="text-body2 text-primary-10 mt-0.5">{subheadline}</p>
            </div>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Booking details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-2">Hotel</p>
                <p className="text-label1 text-primary-13">{confirmedBooking.hotel}</p>
                <p className="text-body3 text-primary-10">{confirmedBooking.location}</p>
              </div>
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-2">Guest</p>
                <p className="text-label1 text-primary-13">{confirmedBooking.guestName}</p>
              </div>
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-2">Dates</p>
                <p className="text-body2 text-primary-13">{confirmedBooking.checkIn} – {confirmedBooking.checkOut}</p>
                <p className="text-body3 text-primary-10">{confirmedBooking.nights} nights</p>
              </div>
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-2">Booking #</p>
                <p className="text-body2 text-primary-13 font-mono">PCL-{Math.floor(Math.random() * 9000000 + 1000000)}</p>
              </div>
            </div>

            {/* Payment summary */}
            <div className={`rounded-md p-4 border ${isRNPL ? "bg-success-3 border-success-4" : "bg-primary-2 border-primary-5"}`}>
              <p className="text-label2 text-primary-11 uppercase tracking-wide mb-2">Payment Summary</p>

              {isRNPL ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-body2 text-success-11 font-medium">Charged today</span>
                    <span className="text-heading5 text-success-8 font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-body3 text-primary-10">
                      Card ending in {confirmedBooking.cardLastFour} charged on {confirmedBooking.rnplPaymentDue}
                    </span>
                    <span className="text-label1 text-primary-13">${confirmedBooking.total.toFixed(2)}</span>
                  </div>
                  <p className="text-body3 text-success-11 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">notifications</span>
                    We&apos;ll send a reminder to {confirmedBooking.email} before the deadline.
                  </p>
                  <p className="text-body3 text-primary-10 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">info</span>
                    You can pay anytime before the deadline from My Trips.
                  </p>
                </div>
              ) : isAffirm ? (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-body2 text-primary-10">First payment (today)</span>
                    <span className="text-label1 text-primary-13">${(confirmedBooking.total / 4).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body2 text-primary-10">3 remaining payments</span>
                    <span className="text-label1 text-primary-13">${(confirmedBooking.total / 4).toFixed(2)} each</span>
                  </div>
                  <p className="text-body3 text-primary-10 mt-1">Managed through your Affirm account.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-body2 text-primary-10">{amountText}</span>
                    <span className="text-label1 text-primary-13">${confirmedBooking.total.toFixed(2)}</span>
                  </div>
                  {confirmedBooking.tripProtection === "yes" && (
                    <div className="flex justify-between">
                      <span className="text-body2 text-primary-10">Trip protection</span>
                      <span className="text-body2 text-primary-13">$49.00</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isRNPL && (
                <Link href="/my-trips"
                  className="flex-1 px-6 py-3 bg-success-8 text-white rounded-md text-label1 font-semibold
                    hover:bg-success-11 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  View My Trips
                </Link>
              )}
              <Link href="/my-trips"
                className={`flex-1 px-6 py-3 border border-primary-6 bg-white text-primary-9 rounded-md text-label1 font-semibold
                  hover:bg-primary-2 transition-colors flex items-center justify-center gap-2 ${!isRNPL ? "sm:flex-none" : ""}`}
              >
                <span className="material-symbols-outlined text-[18px]">luggage</span>
                View My Trips
              </Link>
            </div>

            <button onClick={handleStartOver}
              className="w-full text-label2 text-primary-8 hover:underline focus:outline-none"
            >
              Start over (prototype reset)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
