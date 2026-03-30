"use client";

import { useState } from "react";
import { useBookingStore } from "@/src/store/useBookingStore";
import { getBookingData, fmt } from "@/src/mocks/booking";

export default function TripSummaryCard() {
  const { paymentMethod, scenario } = useBookingStore();
  const data = getBookingData(scenario);
  const isRNPL = paymentMethod === "rnpl";
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const todayAmount = isRNPL ? 0 : data.total;

  return (
    <div className="rounded-lg bg-white border border-primary-6 overflow-hidden sticky top-4
      shadow-[0px_1px_3px_rgba(13,15,20,0.1),0px_1px_2px_rgba(13,15,20,0.06)]">
      <div className="bg-primary-11 px-5 py-3">
        <p className="text-label2 text-primary-4 uppercase tracking-widest">Trip Summary</p>
      </div>

      <div className="p-5 space-y-3">
        {/* Per night */}
        <div className="flex justify-between items-center">
          <span className="text-body2 text-primary-10">Price per night</span>
          <div className="flex items-center gap-1.5">
            <span className="text-body3 text-primary-10 line-through">${data.originalPrice}</span>
            <span className="text-label1 text-primary-13">${data.pricePerNight}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-body2 text-primary-10">{data.nights} nights × ${data.pricePerNight}</span>
          <span className="text-body2 text-primary-13">${(data.nights * data.pricePerNight).toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-body2 text-primary-10">Taxes and fees</span>
          <span className="text-body2 text-primary-13">${data.taxes.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pb-3 border-b border-primary-5">
          <span className="text-body2 text-primary-10">Service fee</span>
          <span className="text-body2 text-primary-13">${data.serviceFee.toFixed(2)}</span>
        </div>

        {/* You pay today — key moment */}
        <div className={`rounded-md px-4 py-3 transition-all duration-300
          ${isRNPL
            ? "bg-success-3 border-2 border-success-8"
            : "bg-success-3 border border-success-4"}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-label1 text-success-11">You pay today</span>
            <span className={`transition-all duration-300 font-bold ${isRNPL ? "text-heading4 text-success-8" : "text-heading5 text-success-11"}`}>
              {isRNPL ? "$0.00" : `$${todayAmount.toFixed(2)}`}
            </span>
          </div>
          {isRNPL ? (
            <div className="mt-1 space-y-0.5">
              <p className="text-body3 text-success-11 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">event_available</span>
                No charge today
              </p>
              <p className="text-body3 text-primary-10">
                Card charged <strong className="text-primary-13">${data.total.toFixed(2)}</strong> on {fmt(data.rnplPaymentDue)}
              </p>
            </div>
          ) : (
            <p className="text-body3 text-success-11 mt-0.5">
              or 4 payments of ${(data.total / 4).toFixed(2)} with Affirm
            </p>
          )}
        </div>

        {/* Due at property */}
        <div className="pt-1 space-y-1.5">
          <p className="text-label3 text-primary-10 uppercase tracking-wide">Due at property</p>
          <div className="flex justify-between">
            <span className="text-body3 text-primary-10">Property fee</span>
            <span className="text-body3 text-primary-13">$25.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-body3 text-primary-10">Tax on fees</span>
            <span className="text-body3 text-primary-13">$2.50</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between pt-3 border-t border-primary-6">
          <span className="text-label1 text-primary-13">Total Cost</span>
          <span className="text-label1 text-primary-13">${(data.total + 27.50).toFixed(2)}</span>
        </div>

        {/* Promo */}
        <div className="border-t border-primary-5 pt-2">
          <button
            onClick={() => setPromoOpen(!promoOpen)}
            className="w-full flex items-center justify-between text-label2 text-primary-8 hover:text-primary-9 py-1 focus:outline-none"
          >
            <span>Have a promo code?</span>
            <span className="material-symbols-outlined text-[20px]">{promoOpen ? "expand_less" : "expand_more"}</span>
          </button>
          {promoOpen && (
            <div className="flex gap-2 mt-2">
              <input
                type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-primary-6 rounded-md text-body2 text-primary-13 placeholder:text-primary-6
                  focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20"
              />
              <button className="px-4 py-2 bg-primary-9 text-white rounded-md text-label2 hover:bg-primary-10 transition-colors">
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
