"use client";

import { useBookingStore } from "@/src/store/useBookingStore";

const STEPS = [
  { n: 1, label: "Choose Room" },
  { n: 2, label: "Guest & Payment Details" },
  { n: 3, label: "Booking Confirmation" },
];

export default function Header() {
  const { scenario, setScenario } = useBookingStore();

  return (
    <>
      {/* Dev eligibility toggle */}
      <div className="bg-primary-13 py-1.5">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="text-label3 text-primary-6 uppercase tracking-widest">Prototype</span>
          <div className="flex items-center gap-2">
            <span className="text-label3 text-primary-6">Test:</span>
            <div className="flex items-center bg-primary-12 rounded p-0.5 gap-0.5">
              <button
                onClick={() => setScenario("eligible")}
                className={`px-3 py-1 rounded text-label3 transition-colors ${
                  scenario === "eligible" ? "bg-success-8 text-white" : "text-primary-6 hover:text-white"
                }`}
              >
                RNPL Eligible
              </button>
              <button
                onClick={() => setScenario("ineligible")}
                className={`px-3 py-1 rounded text-label3 transition-colors ${
                  scenario === "ineligible" ? "bg-error-8 text-white" : "text-primary-6 hover:text-white"
                }`}
              >
                RNPL Ineligible
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Priceline header */}
      <header className="bg-white border-b border-primary-6">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-heading5 text-primary-11 font-bold tracking-tight select-none">priceline</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary-11">lock</span>
            <span className="text-label2 text-primary-11 uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Trust badges */}
      <div className="bg-primary-11">
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-center gap-8 flex-wrap">
          {[
            { icon: "lock", label: "Secure Transactions" },
            { icon: "support_agent", label: "24-Hour Service" },
            { icon: "verified", label: "Trusted Payments" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary-4">{b.icon}</span>
              <span className="text-label3 text-primary-4 uppercase tracking-widest">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress stepper */}
      <div className="bg-white border-b border-primary-6">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-center">
          {STEPS.map((step, i) => {
            const isActive = step.n === 2;
            const isComplete = step.n < 2;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.n} className="flex items-center">
                <div className="flex items-center gap-2">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-label3 shrink-0
                    ${isComplete || isActive ? "bg-primary-9 text-white" : "bg-primary-2 text-primary-10 border border-primary-6"}`}>
                    {isComplete ? <span className="material-symbols-outlined text-[14px]">check</span> : step.n}
                  </span>
                  <span className={`text-label2 whitespace-nowrap ${isActive ? "text-primary-9" : "text-primary-10"}`}>
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div className={`mx-3 h-[2px] w-12 shrink-0 ${step.n < 2 ? "bg-primary-9" : "bg-primary-6"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
