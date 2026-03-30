"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import SectionCard from "./SectionCard";

export default function TripProtectionSection() {
  const { tripProtection, setTripProtection } = useBookingStore();

  return (
    <SectionCard
      title="Add Trip Protection"
      badges={[
        { text: "Recommended", style: "caution" },
        { text: "Only available now", style: "success" },
      ]}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-body3 text-primary-10">
          <span className="material-symbols-outlined text-[14px] text-primary-8 mt-0.5 shrink-0">shield</span>
          <p>
            Protect your trip for just <strong className="text-primary-13">$49.00</strong> per person.
            Coverage includes trip cancellation, interruption, medical emergencies, and baggage protection.
          </p>
        </div>

        {(["yes", "no"] as const).map((val) => (
          <label
            key={val}
            className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-colors
              ${tripProtection === val ? "border-primary-9 bg-primary-3" : "border-primary-6 bg-white hover:border-primary-8"}`}
          >
            <input
              type="radio"
              name="tripProtection"
              value={val}
              checked={tripProtection === val}
              onChange={() => setTripProtection(val)}
              className="accent-primary-9 w-4 h-4 shrink-0"
            />
            <span className="text-body2 text-primary-13">
              {val === "yes"
                ? "Yes, protect my stay for $49.00"
                : "No, I'll take my chances"}
            </span>
          </label>
        ))}
      </div>
    </SectionCard>
  );
}
