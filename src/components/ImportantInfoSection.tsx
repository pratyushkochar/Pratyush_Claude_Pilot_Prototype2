"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import SectionCard from "./SectionCard";

export default function ImportantInfoSection() {
  const { agreedToTerms, setAgreedToTerms, errors } = useBookingStore();

  return (
    <SectionCard title="Important Information">
      <div className="space-y-4">
        <div className="text-body3 text-primary-10 space-y-1.5">
          <p><strong className="text-primary-13">Refund Policy:</strong> Free cancellation until 48 hours before check-in. After that, a one-night charge applies.</p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary-8">login</span>
              <span>Check-in from 3:00 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary-8">logout</span>
              <span>Check-out by 11:00 AM</span>
            </div>
          </div>
        </div>

        <label className={`flex items-start gap-2 cursor-pointer p-3 rounded-md border transition-colors
          ${errors.agreedToTerms ? "border-error-8 bg-error-3" : "border-primary-5 hover:border-primary-6"}`}
        >
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 shrink-0 accent-primary-9"
          />
          <span className="text-body3 text-primary-10">
            I agree to the{" "}
            <button className="text-primary-8 hover:underline focus:outline-none">Booking Conditions</button>
            ,{" "}
            <button className="text-primary-8 hover:underline focus:outline-none">Privacy Policy</button>
            , and confirm I am 21 years or older.
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="flex items-center gap-1 text-body3 text-error-11">
            <span className="material-symbols-outlined text-[13px]">error</span>
            {errors.agreedToTerms}
          </p>
        )}
      </div>
    </SectionCard>
  );
}
