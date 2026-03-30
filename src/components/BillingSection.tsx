"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import SectionCard from "./SectionCard";
import FormField from "./FormField";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Mexico"];

export default function BillingSection() {
  const { billing, setBilling, errors } = useBookingStore();

  return (
    <SectionCard title="Billing Information">
      <div className="space-y-4">
        <FormField label="Street Address" id="streetAddress" required
          value={billing.streetAddress} onChange={(v) => setBilling({ streetAddress: v })}
          error={errors.streetAddress} placeholder="123 Main St"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="country" className="text-label2 text-primary-13">Country</label>
          <div className="relative">
            <select
              id="country"
              value={billing.country}
              onChange={(e) => setBilling({ country: e.target.value })}
              className="w-full px-3 py-2.5 pr-8 rounded-md border border-primary-6 bg-white text-body2 text-primary-13
                focus:outline-none focus:ring-2 focus:border-primary-9 focus:ring-primary-9/20 transition-colors appearance-none"
            >
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-success-8 pointer-events-none">
              check_circle
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="ZIP Code" id="zipCode" required
            value={billing.zipCode} onChange={(v) => setBilling({ zipCode: v })}
            error={errors.zipCode} placeholder="10001"
          />
          <FormField label="City" id="city" required
            value={billing.city} onChange={(v) => setBilling({ city: v })}
            error={errors.city} placeholder="New York"
          />
        </div>

        <div className="pt-1 border-t border-primary-5 space-y-4">
          <p className="text-label3 text-primary-10 uppercase tracking-wide">Contact Information</p>
          <FormField label="Email Address" id="email" type="email" required
            value={billing.email} onChange={(v) => setBilling({ email: v })}
            error={errors.email} placeholder="john@example.com"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-label2 text-primary-13">
              Mobile Phone<span className="text-error-8 ml-0.5">*</span>
            </label>
            <div className="flex">
              <select
                value={billing.countryCode}
                onChange={(e) => setBilling({ countryCode: e.target.value })}
                className="px-2 py-2.5 border border-r-0 border-primary-6 rounded-l-md bg-white text-body2 text-primary-13
                  focus:outline-none transition-colors"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
                <option value="+61">+61</option>
              </select>
              <input
                id="phone" type="tel"
                value={billing.phone}
                onChange={(e) => setBilling({ phone: e.target.value })}
                placeholder="(555) 123-4567"
                className={`flex-1 px-3 py-2.5 border rounded-r-md text-body2 text-primary-13 placeholder:text-primary-6
                  focus:outline-none focus:ring-2 transition-colors
                  ${errors.phone ? "border-error-8 bg-error-3 focus:border-error-8 focus:ring-error-8/20" : "border-primary-6 bg-white focus:border-primary-9 focus:ring-primary-9/20"}`}
              />
            </div>
            {errors.phone && (
              <p className="flex items-center gap-1 text-body3 text-error-11">
                <span className="material-symbols-outlined text-[13px]">error</span>
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
