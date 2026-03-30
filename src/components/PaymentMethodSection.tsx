"use client";

import { useState } from "react";
import { useBookingStore } from "@/src/store/useBookingStore";
import { getBookingData, fmt } from "@/src/mocks/booking";
import { PaymentMethodType } from "@/src/types";
import SectionCard from "./SectionCard";
import FormField from "./FormField";

const MONTHS = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const YEARS = Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + i));

// ── Logo helpers ────────────────────────────────────────────────────────────

function LogoImg({
  src, alt, height, fallback,
}: {
  src: string; alt: string; height: number; fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} height={height} style={{ height, width: "auto", objectFit: "contain" }} onError={() => setFailed(true)} />;
}

function ApplePayLogo() {
  return (
    <div className="flex items-center gap-1.5 bg-black rounded-md px-2.5 py-1">
      <svg width="13" height="15" viewBox="0 0 13 15" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Apple stem */}
        <path d="M7.8 1.2C8.3 0.5 8.9 0.1 9.5 0 9.6 0.8 9.3 1.6 8.8 2.2 8.3 2.9 7.7 3.3 7 3.2 6.9 2.5 7.3 1.8 7.8 1.2Z"/>
        {/* Apple body */}
        <path d="M10.6 4.9C9.6 4.2 8.7 3.8 8 3.8 7.2 3.8 6.8 4.2 6.1 4.2 5.4 4.2 4.8 3.8 3.9 3.8 2.2 3.9 0.5 5.3 0.5 7.9 0.5 9.5 1.1 11.2 1.9 12.3 2.6 13.2 3.3 14 4.2 14 5.1 14 5.5 13.4 6.5 13.4 7.5 13.4 7.8 14 8.8 14 9.7 14 10.4 13.2 11.1 12.4 11.9 11.4 12.2 10.4 12.2 10.4 12.2 10.2 10.4 10.4 9.4 9.6 8.3 8.4 7.5 8.4 8 8.4 9.2 7.6 9.8 6.8 10.4 6 10.4 5.4 10.4 4.9Z"/>
      </svg>
      <span style={{ color: "white", fontSize: 13, fontWeight: 600, fontFamily: "-apple-system, system-ui, sans-serif", letterSpacing: "-0.2px", lineHeight: 1 }}>
        Pay
      </span>
    </div>
  );
}

function GooglePayFallback() {
  return (
    <svg width="58" height="24" viewBox="0 0 58 24" xmlns="http://www.w3.org/2000/svg">
      <text y="17" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="500">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">l</tspan>
        <tspan fill="#EA4335">e </tspan>
        <tspan fill="#5F6368">Pay</tspan>
      </text>
    </svg>
  );
}

function CardBrandRow() {
  const brands = [
    {
      src: "https://s1.pclncdn.com/design-assets/payment/visa.svg",
      alt: "Visa",
      fallback: (
        <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="38" height="24" rx="4" fill="#1A1F71"/>
          <text x="5" y="17" fill="white" fontSize="13" fontWeight="800" fontStyle="italic" fontFamily="Arial, sans-serif" letterSpacing="0.5">VISA</text>
        </svg>
      ),
    },
    {
      src: "https://s1.pclncdn.com/design-assets/payment/mastercard.svg",
      alt: "Mastercard",
      fallback: (
        <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="38" height="24" rx="4" fill="white" stroke="#ddd"/>
          <circle cx="14" cy="12" r="8" fill="#EB001B"/>
          <circle cx="24" cy="12" r="8" fill="#F79E1B"/>
          <path d="M19 5.5a8 8 0 0 0 0 13a8 8 0 0 0 0-13z" fill="#FF5F00"/>
        </svg>
      ),
    },
    {
      src: "https://s1.pclncdn.com/design-assets/payment/amex.svg",
      alt: "Amex",
      fallback: (
        <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="38" height="24" rx="4" fill="#007BC1"/>
          <text x="4" y="14" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.4">AMERICAN</text>
          <text x="4" y="22" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.4">EXPRESS</text>
        </svg>
      ),
    },
    {
      src: "https://s1.pclncdn.com/design-assets/payment/discover.svg",
      alt: "Discover",
      fallback: (
        <svg width="46" height="24" viewBox="0 0 46 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="46" height="24" rx="4" fill="white" stroke="#ddd"/>
          <text x="3" y="16" fill="#231F20" fontSize="8.5" fontWeight="700" fontFamily="Arial, sans-serif">discover</text>
          <circle cx="38" cy="12" r="8" fill="#F76F20"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {brands.map((b) => (
        <LogoImg key={b.alt} src={b.src} alt={b.alt} height={24} fallback={b.fallback} />
      ))}
    </div>
  );
}

function PayPalFallback() {
  return (
    <svg width="72" height="20" viewBox="0 0 72 20" xmlns="http://www.w3.org/2000/svg">
      <text y="15" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">
        <tspan fill="#003087">Pay</tspan><tspan fill="#009CDE">Pal</tspan>
      </text>
    </svg>
  );
}

function AffirmFallback() {
  return (
    <svg width="56" height="20" viewBox="0 0 56 20" xmlns="http://www.w3.org/2000/svg">
      <text y="15" fill="#060809" fontFamily="Georgia, serif" fontSize="15" fontWeight="600" letterSpacing="-0.3">affirm</text>
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function PaymentMethodSection() {
  const { paymentMethod, setPaymentMethod, card, setCard, errors, scenario } = useBookingStore();
  const data = getBookingData(scenario);
  const rnplEligible = data.isRNPLEligible;
  const [showRNPLTooltip, setShowRNPLTooltip] = useState(false);

  const isSelected = (m: PaymentMethodType) => paymentMethod === m;

  function RadioRow({
    method, children, disabled, badge,
  }: {
    method: PaymentMethodType;
    children: React.ReactNode;
    disabled?: boolean;
    badge?: React.ReactNode;
  }) {
    const sel = isSelected(method);
    return (
      <label
        className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed border-primary-5 bg-primary-2" :
            sel ? "border-primary-9 bg-primary-3" : "border-primary-6 bg-white hover:border-primary-8"}`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value={method}
          checked={sel}
          disabled={disabled}
          onChange={() => !disabled && setPaymentMethod(method)}
          className="accent-primary-9 w-4 h-4 shrink-0"
        />
        <div className="flex-1 flex items-center gap-3 min-w-0">{children}</div>
        {badge}
      </label>
    );
  }

  return (
    <SectionCard title="Payment Method">
      <div className="space-y-2">

        {/* Apple Pay */}
        <RadioRow method="apple_pay">
          <ApplePayLogo />
        </RadioRow>

        {/* Google Pay */}
        <RadioRow method="google_pay">
          <LogoImg
            src="https://developers.google.com/static/pay/images/brand-guidelines/google-pay-mark.png"
            alt="Google Pay"
            height={32}
            fallback={
              <LogoImg
                src="https://www.gstatic.com/instantbuy/svg/dark_gpay.svg"
                alt="Google Pay"
                height={32}
                fallback={<GooglePayFallback />}
              />
            }
          />
        </RadioRow>

        {/* Credit Card */}
        <div>
          <RadioRow method="credit_card">
            <span className="material-symbols-outlined text-[26px] text-primary-11 shrink-0">credit_card</span>
            <span className="text-body2 text-primary-13 font-medium">Credit Card or Debit</span>
          </RadioRow>

          {isSelected("credit_card") && (
            <div className="mt-2 ml-4 p-4 bg-primary-2 border border-primary-5 rounded-md space-y-3">
              <CardBrandRow />
              <FormField label="Name on Card" id="nameOnCard" required
                value={card.nameOnCard} onChange={(v) => setCard({ nameOnCard: v })}
                error={errors.nameOnCard} placeholder="John Doe"
              />
              <FormField label="Card Number" id="cardNumber" required
                value={card.cardNumber} onChange={(v) => setCard({ cardNumber: v })}
                error={errors.cardNumber} placeholder="1234 5678 9012 3456"
              />
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-label2 text-primary-13">Month<span className="text-error-8 ml-0.5">*</span></label>
                  <select value={card.expMonth} onChange={(e) => setCard({ expMonth: e.target.value })}
                    className={`px-3 py-2.5 rounded-md border text-body2 text-primary-13 bg-white focus:outline-none focus:ring-2 transition-colors
                      ${errors.expMonth ? "border-error-8 focus:ring-error-8/20" : "border-primary-6 focus:border-primary-9 focus:ring-primary-9/20"}`}
                  >
                    <option value="">MM</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.expMonth && <p className="text-body3 text-error-11">{errors.expMonth}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-label2 text-primary-13">Year<span className="text-error-8 ml-0.5">*</span></label>
                  <select value={card.expYear} onChange={(e) => setCard({ expYear: e.target.value })}
                    className={`px-3 py-2.5 rounded-md border text-body2 text-primary-13 bg-white focus:outline-none focus:ring-2 transition-colors
                      ${errors.expYear ? "border-error-8 focus:ring-error-8/20" : "border-primary-6 focus:border-primary-9 focus:ring-primary-9/20"}`}
                  >
                    <option value="">YYYY</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.expYear && <p className="text-body3 text-error-11">{errors.expYear}</p>}
                </div>
                <FormField label="CVV" id="cvv" required
                  value={card.cvv} onChange={(v) => setCard({ cvv: v })}
                  error={errors.cvv} placeholder="123"
                />
              </div>
            </div>
          )}
        </div>

        {/* PayPal */}
        <RadioRow method="paypal">
          <LogoImg
            src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
            alt="PayPal"
            height={24}
            fallback={<PayPalFallback />}
          />
        </RadioRow>

        {/* Affirm / Pay Over Time */}
        <RadioRow method="affirm">
          <LogoImg
            src="https://cdn-assets.affirm.com/images/black_logo-transparent_bg.png"
            alt="Affirm"
            height={20}
            fallback={<AffirmFallback />}
          />
          <span className="text-body3 text-primary-10">
            4 interest-free payments of ${(data.total / 4).toFixed(2)}.{" "}
            <button className="text-primary-8 hover:underline focus:outline-none">Learn more</button>
          </span>
        </RadioRow>

        {/* Reserve Now, Pay Later */}
        <div
          className="relative"
          onMouseEnter={() => !rnplEligible && setShowRNPLTooltip(true)}
          onMouseLeave={() => setShowRNPLTooltip(false)}
        >
          <label
            className={`flex items-center gap-3 px-4 py-3 rounded-md border transition-colors
              ${!rnplEligible
                ? "opacity-50 cursor-not-allowed border-primary-5 bg-primary-2"
                : isSelected("rnpl")
                  ? "border-success-8 bg-success-3 cursor-pointer"
                  : "border-success-7 bg-white hover:border-success-8 cursor-pointer"
              }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="rnpl"
              checked={isSelected("rnpl")}
              disabled={!rnplEligible}
              onChange={() => rnplEligible && setPaymentMethod("rnpl")}
              className="accent-success-8 w-4 h-4 shrink-0"
            />
            <span className="material-symbols-outlined text-[22px] text-success-11 shrink-0">event_available</span>
            <div className="flex-1">
              <span className="text-body2 text-primary-13 font-medium">Reserve Now, Pay Later</span>
              <p className="text-body3 text-success-11">No charge today. Pay in full before your stay.</p>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-label3 font-semibold bg-success-8 text-white shrink-0">
              NEW
            </span>
          </label>

          {!rnplEligible && showRNPLTooltip && (
            <div className="absolute bottom-full left-0 mb-2 z-10 w-72 p-3 bg-primary-13 text-white rounded-md shadow-lg">
              <p className="text-body3">
                Reserve Now, Pay Later is available for bookings over $200 with check-in 7+ days away.
              </p>
              <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-primary-13 rotate-45" />
            </div>
          )}

          {isSelected("rnpl") && (
            <div className="mt-2 ml-4 border border-success-6 rounded-md overflow-hidden">
              {/* Info banner */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-success-3 border-b border-success-5">
                <span className="material-symbols-outlined text-[16px] text-success-11 shrink-0">lock</span>
                <p className="text-body3 text-success-11">
                  No charge today — your card will be securely saved and charged{" "}
                  <strong>${data.total.toFixed(2)}</strong> on <strong>{fmt(data.rnplPaymentDue)}</strong>.
                </p>
              </div>

              {/* Card fields */}
              <div className="p-4 bg-primary-2 space-y-3">
                <FormField label="Name on Card" id="rnpl-nameOnCard" required
                  value={card.nameOnCard} onChange={(v) => setCard({ nameOnCard: v })}
                  error={errors.nameOnCard} placeholder="John Doe"
                />
                <FormField label="Card Number" id="rnpl-cardNumber" required
                  value={card.cardNumber} onChange={(v) => setCard({ cardNumber: v })}
                  error={errors.cardNumber} placeholder="1234 5678 9012 3456"
                />
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-label2 text-primary-13">Month<span className="text-error-8 ml-0.5">*</span></label>
                    <select value={card.expMonth} onChange={(e) => setCard({ expMonth: e.target.value })}
                      className={`px-3 py-2.5 rounded-md border text-body2 text-primary-13 bg-white focus:outline-none focus:ring-2 transition-colors
                        ${errors.expMonth ? "border-error-8 focus:ring-error-8/20" : "border-primary-6 focus:border-primary-9 focus:ring-primary-9/20"}`}
                    >
                      <option value="">MM</option>
                      {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {errors.expMonth && <p className="text-body3 text-error-11">{errors.expMonth}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-label2 text-primary-13">Year<span className="text-error-8 ml-0.5">*</span></label>
                    <select value={card.expYear} onChange={(e) => setCard({ expYear: e.target.value })}
                      className={`px-3 py-2.5 rounded-md border text-body2 text-primary-13 bg-white focus:outline-none focus:ring-2 transition-colors
                        ${errors.expYear ? "border-error-8 focus:ring-error-8/20" : "border-primary-6 focus:border-primary-9 focus:ring-primary-9/20"}`}
                    >
                      <option value="">YYYY</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    {errors.expYear && <p className="text-body3 text-error-11">{errors.expYear}</p>}
                  </div>
                  <FormField label="CVV" id="rnpl-cvv" required
                    value={card.cvv} onChange={(v) => setCard({ cvv: v })}
                    error={errors.cvv} placeholder="123"
                  />
                </div>

                {/* Footer note */}
                <p className="text-body3 text-primary-10 pt-1 border-t border-primary-5">
                  <span className="material-symbols-outlined text-[13px] align-middle mr-1 text-success-8">check_circle</span>
                  Free cancellation until <strong className="text-primary-13">{fmt(data.freeCancelUntil)}</strong>.{" "}
                  We&apos;ll email you a reminder before your payment is due.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
