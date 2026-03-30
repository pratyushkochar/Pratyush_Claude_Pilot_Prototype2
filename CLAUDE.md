# Reserve Now, Pay Later — Checkout Prototype

## What This Is
A checkout prototype that adds a new "Reserve Now, Pay Later" payment choice alongside all of Priceline's existing payment methods.

## Hypothesis
Giving customers more flexible payment timing will reduce upfront commitment friction and improve booking conversion.

## Size
Full Experience — complete flow including eligibility logic, payment option selection, confirmation variations, and post-booking state.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Horizon Tier 2 design tokens (see .claude/skills/horizon-prototype.md)
- Zustand for booking and payment state
- No backend — mock eligibility checks and booking responses

## UX Requirements

### Checkout Structure (matches real Priceline checkout)

**Header:**
- Priceline logo, lock icon, "SECURE CHECKOUT"
- Trust badges: Secure Transactions, 24-Hour Service, Trusted Payments
- 3-step progress bar: Choose Room → Guest & Payment Details → Booking Confirmation (step 2 active)

**Left column (~65%):**

1. **"Almost done!" banner** — "Enter your details and complete your booking now."

2. **Hotel Summary Card** — Hotel image, name, location, rating badge, "Fully Refundable" tag, check-in/check-out dates, nights, rooms, room type with amenities

3. **Guest Name** — First Name, Last Name side by side. Blue info banner about age/ID requirement. Checkbox: "Guest name and name on card are the same"

4. **Payment Method** — Radio button options stacked vertically, matching Priceline's current layout plus the new RNPL option:
   - Apple Pay (radio + Apple Pay logo)
   - Google Pay (radio + Google Pay logo)
   - Credit Card or Debit (selected by default) — "Visa, Mastercard, Diners Club, Discover, American Express" with card brand icons. Expands to show: Name on Card, Card Number, MM/YYYY, CVV code fields
   - PayPal (radio + PayPal logo)
   - Pay Over Time — "4 interest-free payments or as low as $X/mo with Affirm. Learn more"
   - **Reserve Now, Pay Later (NEW)** — This is the new addition. Styled with a "NEW" badge and a green/teal accent to draw attention.

5. **Billing** — Street Address, Country (dropdown), Zip Code, City, Email Address, Mobile Phone Number (with +1 country code)

6. **Add Trip Protection** — "Recommended" and "Only available now" badges, coverage details, radio: "Yes, protect my stay for $X" / "No, I'll take my chances"

7. **Important Information** — Refund policy, check-in/check-out times, agree to terms checkbox

8. **CTA Button** — Full-width. Label changes based on selected payment method:
   - Default: "Book & Pay"
   - RNPL selected: "Reserve Now — Pay Later"

**Right column (~35%):**
- Trip Summary card: price per night (with strikethrough original), nights, rooms, taxes/fees
- "You pay today" in green with amount (changes to "$0.00" when RNPL selected)
- Affirm installment mention
- Property fee and Tax on fees (Due at property)
- Total Cost
- "Have a promo code?" expandable

### Reserve Now, Pay Later — Detailed Behavior

**When RNPL is selected:**
- The Credit Card fields disappear (no card needed upfront)
- The Billing section still collects address, email, and phone
- The "You pay today" amount in the Trip Summary changes to "$0.00" with green text
- A new info box appears below RNPL showing:
  - "No charge today. Full payment of $X due by [date — 48 hours before check-in]."
  - "We'll send a reminder to your email before the deadline."
  - "Free cancellation until [date]. After that, standard cancellation policy applies."
  - Calendar icon + shield icon for visual reassurance
- The CTA button changes from "Book & Pay" to "Reserve Now — Pay Later" with a calendar icon

**Eligibility Rules (mocked):**
- Available when: hotel booking total is over $200 AND check-in is 7+ days away
- When eligible: RNPL radio option is fully interactive with "NEW" badge
- When ineligible: RNPL option is visible but greyed out/disabled with a tooltip: "Reserve Now, Pay Later is available for bookings over $200 with check-in 7+ days away"

**Toggle for testing eligibility:**
- Add a small developer toggle in the top-right corner: "Test: Eligible / Ineligible"
- Switching it changes the check-in date and disables/enables RNPL so stakeholders can see both states

### Confirmation Page Variations
After clicking the CTA, show a confirmation page that varies by payment method:

- **Pay Now (Credit Card):** "Booking Confirmed! Your card ending in [XXXX] has been charged $X."
- **Pay Over Time (Affirm):** "Booking Confirmed! First payment of $X charged today. Next payment of $X on [date]."
- **Reserve Now, Pay Later:** "Booking Reserved! No charge today. Full payment of $X is due by [date]. We'll send a reminder to [email]. You can pay anytime before the deadline from your My Trips page."

Each confirmation shows: hotel details, dates, guest name, payment summary, and a "View My Trips" link.

### Post-Booking "My Trips" View (Stretch Goal)
A simple My Trips page showing the reservation:
- Hotel card with booking details
- Payment status badge: "Reserved — Payment Due [date]"
- Countdown: "X days until payment deadline"
- "Pay Now" CTA button (green, prominent)
- "Cancel Reservation" link
- When paid: status changes to "Confirmed — Paid"

## Mock Booking Data

**Scenario 1 — RNPL Eligible:**
- Hotel: "The Venetian Resort, Las Vegas"
- Room: Luxury King Suite, 1 King Bed
- Check-in: 14 days from today
- Check-out: 17 days from today (3 nights)
- Price: $249/night (was $299), Taxes: $89.10, Total: $847 + fees
- Amenities: Pool, Spa, Free Wifi, Valet Parking

**Scenario 2 — RNPL Ineligible (for toggle testing):**
- Same hotel but check-in is 3 days from today (fails the 7-day rule)

## Design Direction
- All existing payment methods should look identical to the real Priceline checkout
- The RNPL option is the only new addition — it should stand out with a "NEW" badge and subtle green/teal accent border on its radio card
- When RNPL is selected, the Trip Summary "You pay today" changing to "$0.00" should be the most satisfying moment — make it feel like a win for the user
- Confirmation pages should feel polished and trustworthy
- Use Horizon Tier 2 styling throughout

## File Structure Convention
- Components: `src/components/` (PascalCase)
- Pages: `src/app/`
- Types: `src/types/`
- Mock data: `src/mocks/`
