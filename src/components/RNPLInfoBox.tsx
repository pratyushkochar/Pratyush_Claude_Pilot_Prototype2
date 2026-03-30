"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import { getBookingData, fmt } from "@/src/mocks/booking";

export default function RNPLInfoBox() {
  const scenario = useBookingStore((s) => s.scenario);
  const data = getBookingData(scenario);

  return (
    <div className="mt-3 p-4 bg-success-3 border border-success-4 rounded-md space-y-2.5">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[22px] text-success-11 shrink-0 mt-0.5">event_available</span>
        <div>
          <p className="text-label1 text-success-11">Reserve your room. Pay later.</p>
          <p className="text-body3 text-success-11 mt-0.5">
            No charge today. Full payment of{" "}
            <strong>${data.total.toFixed(2)}</strong> due by{" "}
            <strong>{fmt(data.rnplPaymentDue)}</strong>.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[18px] text-success-11 shrink-0 mt-0.5">notifications</span>
        <p className="text-body3 text-success-11">
          We&apos;ll send a reminder to your email before the payment deadline.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[18px] text-success-11 shrink-0 mt-0.5">shield</span>
        <p className="text-body3 text-success-11">
          Free cancellation until <strong>{fmt(data.freeCancelUntil)}</strong>.
          After that, standard cancellation policy applies.
        </p>
      </div>
    </div>
  );
}
