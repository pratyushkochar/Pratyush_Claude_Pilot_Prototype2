"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import { getBookingData, fmtShort, AMENITY_LABELS } from "@/src/mocks/booking";
import SectionCard from "./SectionCard";

const AMENITY_ICONS: Record<string, string> = {
  pool: "pool",
  spa: "spa",
  wifi: "wifi",
  local_parking: "local_parking",
};

export default function HotelSummaryCard() {
  const scenario = useBookingStore((s) => s.scenario);
  const data = getBookingData(scenario);

  return (
    <SectionCard title="Your Hotel">
      <div className="flex gap-4">
        {/* Image placeholder */}
        <div className="w-24 h-20 rounded-md bg-gradient-to-br from-primary-3 to-primary-4 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[32px] text-primary-8">hotel</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3 className="text-label1 text-primary-13">{data.hotelName}</h3>
              <p className="text-body3 text-primary-10 flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[12px]">location_on</span>
                {data.location}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-9 text-white rounded text-label3">
                <span className="material-symbols-outlined text-[11px]">star</span>
                8.5 Very Good
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success-3 text-success-11 border border-success-4 rounded text-label3">
                <span className="material-symbols-outlined text-[11px]">check_circle</span>
                Fully Refundable
              </span>
            </div>
          </div>

          {/* Room type */}
          <p className="text-body3 text-primary-10 mt-1.5">{data.roomType} · 1 King Bed</p>

          {/* Amenities */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {data.amenities.map((a) => (
              <div key={a} className="flex items-center gap-1 text-body3 text-primary-10">
                <span className="material-symbols-outlined text-[13px] text-primary-8">{AMENITY_ICONS[a] ?? a}</span>
                {AMENITY_LABELS[a]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dates row */}
      <div className="mt-4 pt-4 border-t border-primary-5 grid grid-cols-3 gap-3">
        {[
          { icon: "login", label: "Check-in", val: fmtShort(data.checkIn) },
          { icon: "logout", label: "Check-out", val: fmtShort(data.checkOut) },
          { icon: "nights_stay", label: "Stay", val: `${data.nights} nights` },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-primary-8">{item.icon}</span>
              <span className="text-label3 text-primary-10 uppercase tracking-wide">{item.label}</span>
            </div>
            <span className="text-label2 text-primary-13">{item.val}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
