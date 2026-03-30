"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBookingStore } from "@/src/store/useBookingStore";
import { getBookingData, fmt, fmtShort } from "@/src/mocks/booking";

export default function MyTripsPage() {
  const router = useRouter();
  const { confirmedBooking, scenario, reset } = useBookingStore();
  const [paid, setPaid] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  const data = getBookingData(scenario);
  const isRNPL = confirmedBooking?.paymentMethod === "rnpl";

  useEffect(() => {
    if (!confirmedBooking) router.replace("/");
  }, [confirmedBooking, router]);

  useEffect(() => {
    if (isRNPL) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(data.rnplPaymentDue);
      due.setHours(0, 0, 0, 0);
      const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(0, diff));
    }
  }, [isRNPL, data.rnplPaymentDue]);

  if (!confirmedBooking) return null;

  function handlePayNow() {
    setPaid(true);
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
          <Link href="/" className="text-label2 text-primary-8 hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to checkout
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-heading3 text-primary-13 mb-6">My Trips</h1>

        {/* Booking card */}
        <div className={`bg-white rounded-lg border overflow-hidden shadow-[0px_1px_3px_rgba(13,15,20,0.1)]
          ${isRNPL && !paid ? "border-success-8" : "border-primary-6"}`}
        >
          {/* Hotel image banner */}
          <div className="h-32 bg-gradient-to-r from-primary-11 to-primary-9 flex items-center px-6 gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_30%_50%,white,transparent)]" />
            <span className="material-symbols-outlined text-[48px] text-white opacity-80">hotel</span>
            <div>
              <p className="text-heading5 text-white">{confirmedBooking.hotel}</p>
              <p className="text-body3 text-primary-4">{confirmedBooking.location}</p>
            </div>

            {/* Status badge */}
            <div className="absolute top-4 right-4">
              {paid ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-8 text-white rounded-full text-label2">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Confirmed — Paid
                </span>
              ) : isRNPL ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-caution-3 text-caution-11 border border-caution-4 rounded-full text-label2">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Reserved — Payment Due
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-8 text-white rounded-full text-label2">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Confirmed
                </span>
              )}
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Dates + guest */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-1">Check-in</p>
                <p className="text-label1 text-primary-13">{fmtShort(data.checkIn)}</p>
                <p className="text-body3 text-primary-10">From 3:00 PM</p>
              </div>
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-1">Check-out</p>
                <p className="text-label1 text-primary-13">{fmtShort(data.checkOut)}</p>
                <p className="text-body3 text-primary-10">By 11:00 AM</p>
              </div>
              <div>
                <p className="text-label3 text-primary-10 uppercase tracking-wide mb-1">Guest</p>
                <p className="text-label1 text-primary-13">{confirmedBooking.guestName}</p>
              </div>
            </div>

            {/* RNPL payment due section */}
            {isRNPL && !paid && (
              <div className="rounded-md p-4 bg-caution-3 border border-caution-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-label1 text-caution-11 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      Payment Due: {fmt(data.rnplPaymentDue)}
                    </p>
                    <p className="text-body3 text-caution-11 mt-0.5">
                      {daysLeft === 0
                        ? "Payment due today!"
                        : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} until payment deadline`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-label3 text-caution-11 uppercase tracking-wide">Amount due</p>
                    <p className="text-heading4 text-caution-11">${confirmedBooking.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Countdown bar */}
                <div className="h-2 bg-caution-4 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-caution-8 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(5, 100 - (daysLeft / data.daysUntilCheckin) * 100)}%` }}
                  />
                </div>

                {/* Pay Now CTA */}
                <button
                  onClick={handlePayNow}
                  className="w-full px-6 py-3.5 bg-success-8 text-white rounded-md text-label1 font-semibold
                    hover:bg-success-11 focus:outline-none focus:ring-2 focus:ring-success-8/30
                    transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">credit_card</span>
                  Pay Now — ${confirmedBooking.total.toFixed(2)}
                </button>

                <p className="text-body3 text-caution-11 text-center">
                  You can also pay from the Priceline app before the deadline.
                </p>
              </div>
            )}

            {/* Paid confirmation */}
            {isRNPL && paid && (
              <div className="rounded-md p-4 bg-success-3 border border-success-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px] text-success-8">check_circle</span>
                <div>
                  <p className="text-label1 text-success-11">Payment received!</p>
                  <p className="text-body3 text-success-11">${confirmedBooking.total.toFixed(2)} charged · Booking confirmed</p>
                </div>
              </div>
            )}

            {/* Non-RNPL confirmation summary */}
            {!isRNPL && (
              <div className="rounded-md p-4 bg-success-3 border border-success-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px] text-success-8">check_circle</span>
                <div>
                  <p className="text-label1 text-success-11">Booking Confirmed</p>
                  <p className="text-body3 text-success-11">${confirmedBooking.total.toFixed(2)} charged · You&apos;re all set!</p>
                </div>
              </div>
            )}

            {/* Cancel + reset */}
            <div className="flex items-center justify-between pt-1 border-t border-primary-5">
              {isRNPL && !paid && (
                <button
                  onClick={handleStartOver}
                  className="text-label2 text-error-8 hover:text-error-11 hover:underline focus:outline-none"
                >
                  Cancel Reservation
                </button>
              )}
              <button
                onClick={handleStartOver}
                className="text-label2 text-primary-8 hover:underline focus:outline-none ml-auto"
              >
                Start over (prototype reset)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
