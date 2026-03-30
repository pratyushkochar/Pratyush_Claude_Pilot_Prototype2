"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import SectionCard from "./SectionCard";
import FormField from "./FormField";

export default function GuestNameSection() {
  const { guest, setGuest, errors } = useBookingStore();

  return (
    <SectionCard title="Guest Name">
      <div className="space-y-4">
        <div className="flex items-start gap-2 p-3 bg-primary-3 border border-primary-4 rounded-md">
          <span className="material-symbols-outlined text-[15px] text-primary-8 mt-0.5 shrink-0">info</span>
          <p className="text-body3 text-primary-11">
            Guest must be 21+ years old. Government-issued ID required at check-in.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First Name" id="firstName" required
            value={guest.firstName} onChange={(v) => setGuest({ firstName: v })}
            error={errors.firstName} placeholder="John"
          />
          <FormField
            label="Last Name" id="lastName" required
            value={guest.lastName} onChange={(v) => setGuest({ lastName: v })}
            error={errors.lastName} placeholder="Doe"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={guest.sameAsCard}
            onChange={(e) => setGuest({ sameAsCard: e.target.checked })}
            className="w-4 h-4 rounded accent-primary-9"
          />
          <span className="text-body2 text-primary-10">Guest name and name on card are the same</span>
        </label>
      </div>
    </SectionCard>
  );
}
