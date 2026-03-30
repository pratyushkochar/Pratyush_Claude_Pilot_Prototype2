"use client";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/src/store/useBookingStore";
import Header from "@/src/components/Header";
import HotelSummaryCard from "@/src/components/HotelSummaryCard";
import GuestNameSection from "@/src/components/GuestNameSection";
import PaymentMethodSection from "@/src/components/PaymentMethodSection";
import BillingSection from "@/src/components/BillingSection";
import TripProtectionSection from "@/src/components/TripProtectionSection";
import ImportantInfoSection from "@/src/components/ImportantInfoSection";
import TripSummaryCard from "@/src/components/TripSummaryCard";

export default function CheckoutPage() {
  const router = useRouter();
  const { paymentMethod, submit } = useBookingStore();

  const isRNPL = paymentMethod === "rnpl";

  function handleSubmit() {
    const ok = submit();
    if (ok) router.push("/confirmation");
  }

  const ctaLabel = isRNPL ? "Reserve Now — Pay Later" : "Book & Pay";
  const ctaIcon = isRNPL ? "event_available" : "lock";

  return (
    <div className="min-h-screen bg-primary-2">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <h2 className="text-heading4 text-primary-13">Almost done!</h2>
              <p className="text-body1 text-primary-10 mt-1">Enter your details and complete your booking now.</p>
            </div>

            <HotelSummaryCard />
            <GuestNameSection />
            <PaymentMethodSection />
            <BillingSection />
            <TripProtectionSection />
            <ImportantInfoSection />

            {/* CTA */}
            <button
              onClick={handleSubmit}
              className={`w-full px-6 py-4 text-white rounded-md text-heading6 font-semibold
                focus:outline-none focus:ring-2 transition-all duration-200
                flex items-center justify-center gap-2
                ${isRNPL
                  ? "bg-success-8 hover:bg-success-11 focus:ring-success-8/30"
                  : "bg-primary-11 hover:bg-primary-12 focus:ring-primary-9/30"
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">{ctaIcon}</span>
              {ctaLabel}
            </button>
          </div>

          {/* Right column */}
          <TripSummaryCard />
        </div>
      </main>
    </div>
  );
}
