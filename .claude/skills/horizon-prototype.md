---
name: horizon-prototype
description: "Build rapid Priceline prototypes using the Horizon design system. Two tiers: (1) If the user has access to Priceline's private npm registry, install @pcln/horizon and use real Horizon React components (Button, Dialog, HorizonIcon, P, Span, FilterChip, Badge, etc.) for production-quality output. (2) If Horizon packages aren't available, use Tailwind CSS utilities themed with Horizon design tokens (colors primary-1 to primary-13, typography text-heading1/text-body1, shadows) for fast on-brand prototyping without component imports. Always use this skill when the user mentions: building screens, designing interfaces, composing layouts, creating mockups, exploring UX patterns, or prototyping with Priceline/Horizon components."
---

# Horizon Prototype Skill

Build on-brand Priceline prototypes fast. This skill supports two approaches depending on whether you have access to Priceline's private npm registry.

**Figma source of truth:** [Horizon Design System](https://www.figma.com/design/nm7bzKMIBArRTTWBhqha9v/%F0%9F%8C%85-Horizon?node-id=34054-160389&p=f&t=xVMnij5OBCnbY1bd-0) -- use this for additional color palettes, component specs, and design tokens not covered in this skill.

---

## Which Tier Should I Use?

**Tier 1 (Horizon Components)** -- Use this if the user has access to Priceline's private npm registry (i.e., they're a Priceline employee or contractor on VPN). Install `@pcln/horizon` and use real React components. This produces output closest to production Priceline UI.

**Tier 2 (Tailwind + Design Tokens)** -- Use this if `@pcln/horizon` is not accessible. Recreate the Horizon look using vanilla Tailwind utilities with Horizon's color tokens, typography, and shadow values. No package dependencies needed.

When in doubt, ask the user: "Do you have access to Priceline's private npm registry to install `@pcln/horizon`?"

---
---

## Tier 1: Horizon Components

Use real `@pcln/horizon` React components. This gives you production-quality UI with built-in accessibility, consistent styling, and the exact same components shipping on Priceline.com.

### Project Setup (from scratch)

If you're starting a fresh prototype, scaffold a React project first:

```bash
npm create vite@latest my-prototype -- --template react
cd my-prototype
```

**1. Install Horizon:**
```bash
npm install @pcln/horizon
```

This pulls from Priceline's private registry (requires VPN/registry access). If the install fails with a 404 or auth error, the user doesn't have registry access -- fall back to Tier 2.

**2. Install Tailwind CSS** (Horizon's CSS uses Tailwind):
```bash
npm install -D tailwindcss @tailwindcss/vite
```

**3. Set up your CSS.** Replace the contents of `src/index.css` with:
```css
@import 'tailwindcss';
@import '@pcln/horizon/tailwind-theme.css';
@import '@pcln/horizon/material-fonts.css';
@import '@pcln/horizon/animate.css';
@import '@pcln/horizon/symbols.css';

@source '../../node_modules/@pcln/horizon/dist';
```

This gives you all Horizon design tokens (colors, typography, shadows) pre-configured for Tailwind, plus Google Material Symbols icons, Montserrat font, and animation utilities.

**4. Add the Tailwind Vite plugin** to `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Now `npm run dev` and you're ready to build with Horizon components.

### Key Packages

| Package | What it provides |
|---------|-----------------|
| `@pcln/horizon` | Core components (Button, Dialog, P, Span, HorizonIcon, FilterChip, Badge, etc.) + design tokens CSS |
| `@pcln/horizon-penny-components` | Penny-specific UI (PennyHotelListingCard, etc.) -- install separately if building Penny features |
| `@pcln/horizon-map-components` | Map components -- install separately if needed |

### Copy-Paste Components

#### Button (Primary)

```jsx
import { Button } from '@pcln/horizon'

<Button type='primary' emphasis='medium' onClick={handleClick}>
  Search
</Button>
```

**Props:** `type` ('primary' | 'secondary'), `emphasis` ('high' | 'medium' | 'low'), `size` ('sm' | default), `disabled`, `onClick`, `className`

#### Button (Secondary)

```jsx
<Button type='secondary' emphasis='medium' onClick={handleCancel}>
  Cancel
</Button>
```

#### Typography (P and Span)

Use `P` for paragraphs and `Span` for inline text. Both accept `textStyle`, `palette`, and `shade` props.

```jsx
import { P, Span } from '@pcln/horizon'

{/* Heading */}
<P textStyle='heading3' palette='primary' shade='13'>Find flights</P>

{/* Body copy (default text) */}
<P textStyle='body1' palette='primary' shade='8'>Compare prices and book instantly</P>

{/* Secondary text */}
<Span textStyle='body2' palette='neutral' shade='10'>3h 45m direct</Span>

{/* Bold label */}
<Span textStyle='body1' palette='primary' shade='11' bold>$299/night</Span>
```

**Props:** `textStyle` ('heading1'-'heading6', 'body1'-'body3', 'subheading1'-'subheading4', 'display1'-'display3'), `palette` ('primary', 'neutral', 'penny', 'success', 'error', 'benefit'), `shade` (1-13), `bold`

#### Input Field

```jsx
import { FormField, FormInput, Label } from '@pcln/horizon'

<FormField>
  <Label htmlFor='email'>Email</Label>
  <FormInput
    id='email'
    name='email'
    type='email'
    placeholder='you@example.com'
    value={email}
    onChange={handleChange}
  />
</FormField>
```

**Error state** -- set `color='error'`:
```jsx
<FormInput
  id='email'
  placeholder='you@example.com'
  value={email}
  onChange={handleChange}
  color='error'
  aria-describedby='email-error'
/>
<Span textStyle='body3' palette='error' shade='11'>Please enter a valid email</Span>
```

#### Card

Compose cards with standard divs + Horizon Tailwind tokens (the CSS import gives you named shadows and all color tokens as Tailwind classes):

```jsx
import { P } from '@pcln/horizon'

<div className='p-6 bg-white border border-primary-6 rounded-xl shadow-sm'>
  <P textStyle='heading4' palette='primary' shade='13' className='mb-2'>Card Title</P>
  <P textStyle='body1' palette='primary' shade='8'>Content here</P>
</div>
```

#### Badge

```jsx
import { Badge } from '@pcln/horizon'

<Badge palette='success' emphasis='medium' size='sm'>
  Confirmed
</Badge>
```

**Props:** `palette` ('success', 'error', 'primary', 'penny'), `emphasis` ('high' | 'medium' | 'low'), `size` ('sm' | default)

#### FilterChip and SuggestionChip

```jsx
import { FilterChip, SuggestionChip } from '@pcln/horizon'

{/* Filter chip with selection state */}
<FilterChip
  name='wifi'
  label='Free WiFi'
  selected={isSelected}
  showCheckIcon={isSelected}
  onClick={() => toggleFilter('wifi')}
/>

{/* Suggestion chip for quick actions */}
<SuggestionChip
  label='Hotels near Times Square'
  onClick={() => handleSuggestion('Hotels near Times Square')}
/>
```

#### Dialog

Replaces custom drawer/popover patterns. Handles mobile and desktop layout automatically.

```jsx
import { Button, Dialog } from '@pcln/horizon'

const [isOpen, setIsOpen] = useState(false)

<Button type='secondary' emphasis='medium' onClick={() => setIsOpen(true)}>
  Filters
</Button>

<Dialog
  open={isOpen}
  onOpenChange={(open) => { if (!open) setIsOpen(false) }}
  showCloseButton
  size='md'
  title='Filter Options'
  headingText='Filter hotels'
>
  <div className='p-4'>
    {/* Dialog content */}
  </div>
</Dialog>
```

**Props:** `open`, `onOpenChange`, `showCloseButton`, `size` ('md'), `title`, `headingText`, `aria-description`

### Icons (HorizonIcon)

```jsx
import { HorizonIcon } from '@pcln/horizon'

<HorizonIcon name='flight' size='24' shade='8' />
<HorizonIcon name='hotel' size='20' shade='11' />
<HorizonIcon name='search' size='24' shade='8' />
```

**Props:** `name` (any Google Material Symbol name), `size` ('16', '20', '24', '32'), `shade` (color shade 1-13), `className`

Browse available icon names: https://fonts.google.com/icons (filter by "Material Symbols")

### Complete Example: Flight Search

```jsx
import { useState } from 'react'
import { Button, P, Span, FormField, FormInput, Label, HorizonIcon } from '@pcln/horizon'

export default function FlightSearch() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  return (
    <div className='min-h-screen bg-primary-1'>
      {/* Hero */}
      <div className='bg-primary-9 text-white py-12 px-6'>
        <div className='max-w-4xl mx-auto'>
          <P textStyle='heading1' className='text-white mb-2'>Find flights</P>
          <P textStyle='body1' className='text-primary-2'>Compare prices and book instantly</P>
        </div>
      </div>

      {/* Search Form */}
      <div className='max-w-4xl mx-auto px-6 -mt-8 relative z-10 mb-12'>
        <div className='bg-white p-8 rounded-xl shadow-md'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <FormField>
              <Label htmlFor='from'>From</Label>
              <FormInput
                id='from'
                placeholder='Departure city'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </FormField>

            <FormField>
              <Label htmlFor='to'>To</Label>
              <FormInput
                id='to'
                placeholder='Destination'
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </FormField>

            <div className='flex items-end'>
              <Button type='primary' emphasis='medium' className='w-full'>
                <HorizonIcon name='search' size='20' shade='1' className='mr-2' />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className='max-w-4xl mx-auto px-6 space-y-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='p-6 bg-white border border-primary-6 rounded-xl hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start'>
              <div>
                <P textStyle='heading5' palette='primary' shade='13'>Direct Flight</P>
                <Span textStyle='body2' palette='primary' shade='8'>Departs 10:00 AM - 3h 45m</Span>
              </div>
              <div className='text-right'>
                <P textStyle='heading4' palette='primary' shade='9'>$299</P>
                <Button type='primary' emphasis='medium' size='sm' className='mt-2'>
                  Select
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Tier 1 Key Rules

- Install `@pcln/horizon` and import its CSS -- this gives you all tokens + components
- Import components from `@pcln/horizon` -- don't rebuild Button, Dialog, Badge, etc.
- Use `P` and `Span` for text with `textStyle`, `palette`, and `shade` props
- Use `HorizonIcon` for icons (Google Material Symbol names)
- Use Tailwind classes for layout (flex, grid, gap, padding) -- Horizon handles the styling tokens
- Cards are composed from divs + Horizon Tailwind tokens (`shadow-sm`, `rounded-xl`, `border-primary-6`)
- Use `Dialog` instead of custom drawer/popover patterns

---
---

## Tier 2: Tailwind + Design Tokens (No Horizon Access)

When `@pcln/horizon` isn't available, use vanilla Tailwind utilities themed with Horizon's design tokens. This approach produces visually similar results without any Priceline package dependencies -- just a Tailwind config with the right colors, typography, and shadows.

### Project Setup (from scratch)

```bash
npm create vite@latest my-prototype -- --template react
cd my-prototype
npm install -D tailwindcss @tailwindcss/vite autoprefixer
```

Add the Tailwind Vite plugin to `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Add to `src/index.css`:
```css
@import 'tailwindcss';
@theme {
  --font-sans: 'Montserrat', system-ui, sans-serif;

  /* PRIMARY — core UI palette */
  --color-primary-1: #FFFFFF;
  --color-primary-2: #EDF0F3;
  --color-primary-3: #E8F2FF;
  --color-primary-4: #D2E6FF;
  --color-primary-5: #E0E5EA;
  --color-primary-6: #C0CAD5;
  --color-primary-7: #B3D4FF;
  --color-primary-8: #0068EF;
  --color-primary-9: #0053BF;
  --color-primary-10: #496785;
  --color-primary-11: #003C8A;
  --color-primary-12: #002F6D;
  --color-primary-13: #001833;

  /* NEUTRAL */
  --color-neutral-1: #FFFFFF;
  --color-neutral-2: #EDF0F3;
  --color-neutral-3: #EDF0F3;
  --color-neutral-4: #E0E5EA;
  --color-neutral-5: #E0E5EA;
  --color-neutral-6: #C0CAD5;
  --color-neutral-7: #8399B0;
  --color-neutral-8: #001833;
  --color-neutral-9: #00040A;
  --color-neutral-10: #496785;
  --color-neutral-11: #00040A;
  --color-neutral-12: #000000;
  --color-neutral-13: #001833;

  /* SUCCESS */
  --color-success-1: #FFFFFF;
  --color-success-3: #ECF7EC;
  --color-success-4: #C1E9C1;
  --color-success-7: #80D580;
  --color-success-8: #00AA00;
  --color-success-11: #006600;
  --color-success-12: #004400;

  /* ERROR */
  --color-error-1: #FFFFFF;
  --color-error-3: #FBEBEB;
  --color-error-4: #F3C2C2;
  --color-error-7: #EB9999;
  --color-error-8: #CC0000;
  --color-error-11: #880000;
  --color-error-12: #6D0000;

  /* CAUTION */
  --color-caution-3: #FFF3C0;
  --color-caution-4: #FEE875;
  --color-caution-7: #FEDC2A;
  --color-caution-8: #E5C000;
  --color-caution-11: #001833;
  --color-caution-12: #4D4310;
}
```

Load Montserrat and Material Symbols in your `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

Now `npm run dev` and all Horizon color tokens are available as Tailwind classes (`bg-primary-8`, `text-error-11`, `border-neutral-6`, etc.).

---

### Critical Defaults

Before starting, memorize these three rules:

1. **Default text color is `text-primary-8`** -- Use this for most body copy, labels, and descriptions
2. **Always use `DrawerToPopover` pattern** -- Adaptive overlay that switches from Drawer (mobile) to Popover (desktop) at Tailwind's `md` breakpoint (768px)
3. **Always use `BaseAutocomplete` behavior** -- Type-ahead search with 300ms debounce, not static dropdowns

---

### Quick Color Decisions

```
Text (default):
  - Primary copy -> text-primary-8 (#0068EF)
  - Headings -> text-primary-13 (#001833)
  - Secondary copy -> text-primary-11 (#003C8A)
  - Disabled text -> text-primary-7 (#B3D4FF)

Backgrounds:
  - Main -> bg-white
  - Secondary -> bg-primary-1 (#FFFFFF) or bg-primary-2 (#EDF0F3)
  - Cards -> bg-white

Borders:
  - Standard -> border-primary-6 (#C0CAD5)
  - Focus/active -> border-primary-9 (#0053BF)

Buttons:
  - Primary button bg -> bg-primary-9 (#0053BF)
  - Primary button hover -> bg-primary-10 (#496785)
  - Primary button active -> bg-primary-11 (#003C8A)
```

---

### Typography Classes

**Always use semantic classes, never Tailwind's generic text sizes:**

```
Headings:
  text-heading1   (32px, 700, 40px line)
  text-heading2   (28px, 700, 36px line)
  text-heading3   (24px, 700, 32px line)
  text-heading4   (20px, 700, 28px line)
  text-heading5   (18px, 600, 24px line)
  text-heading6   (16px, 600, 22px line)

Body:
  text-body1      (16px, 400, 24px line)  -- main copy
  text-body2      (14px, 400, 20px line)  -- secondary
  text-body3      (12px, 400, 18px line)  -- small/captions

Labels:
  text-label1     (14px, 600, 20px line)
  text-label2     (12px, 600, 18px line)
  text-label3     (11px, 600, 16px line)
```

---

### Icons (Google Material Symbols)

Load icons via Google Fonts CSS in your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

Also load Montserrat (Horizon's typeface):
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Use icons with a span element:

```jsx
<span className="material-symbols-outlined text-[24px] text-primary-9">flight</span>
<span className="material-symbols-outlined text-[20px] text-primary-8">hotel</span>
<span className="material-symbols-outlined text-[24px] text-primary-8">search</span>
```

Browse all icon names: https://fonts.google.com/icons (filter by "Material Symbols")

---

### Copy-Paste Components

#### Input Field

```jsx
<div className="flex flex-col gap-2">
  <label className="text-label1 text-primary-13 font-semibold">Email</label>
  <input
    type="email"
    placeholder="you@example.com"
    className="px-4 py-3 border border-primary-6 rounded-md text-body1 text-primary-8 placeholder:text-primary-7 focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20 transition-all"
  />
</div>
```

**Error State:**
```jsx
<input
  className="px-4 py-3 border-2 border-error-6 bg-error-1 rounded-md text-body1 text-primary-13 focus:outline-none focus:border-error-11 focus:ring-2 focus:ring-error-6/20 transition-all"
/>
<span className="text-body3 text-error-11 mt-1">Please enter valid email</span>
```

#### Button (Primary)

```jsx
<button className="px-6 py-3 bg-primary-9 text-white rounded-md text-label1 font-semibold hover:bg-primary-10 active:bg-primary-11 focus:outline-none focus:ring-2 focus:ring-primary-8/30 disabled:bg-primary-5 disabled:text-primary-7 disabled:cursor-not-allowed transition-colors">
  Search
</button>
```

#### Button (Secondary)

```jsx
<button className="px-6 py-3 border border-primary-6 bg-white text-primary-9 rounded-md text-label1 font-semibold hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-8/30 transition-colors">
  Cancel
</button>
```

#### Card

```jsx
<div className="p-6 bg-white border border-primary-6 rounded-lg shadow-[0px_1px_3px_rgba(13,15,20,0.1),0px_1px_2px_rgba(13,15,20,0.06)]">
  <h3 className="text-heading4 text-primary-13 mb-2">Card Title</h3>
  <p className="text-body1 text-primary-8">Content here</p>
</div>
```

#### Status Banner

```jsx
<div className="p-4 px-6 bg-warning-1 border-l-4 border-warning-6 rounded-md">
  <p className="text-body1 text-warning-11 font-semibold">Limited availability</p>
  <p className="text-body3 text-warning-10 mt-1">Only 2 rooms left</p>
</div>
```

#### Badge/Chip

```jsx
<span className="inline-flex items-center gap-2 px-3 py-1 bg-success-1 text-success-11 rounded-full text-label2">
  <span className="material-symbols-outlined text-[14px]">check</span>
  Confirmed
</span>
```

#### Select Dropdown

```jsx
<div className="flex flex-col gap-2">
  <label className="text-label1 text-primary-13 font-semibold">Sort by</label>
  <select className="px-4 py-3 border border-primary-6 bg-white rounded-md text-body1 text-primary-8 focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20 transition-all">
    <option value="">Choose...</option>
    <option value="recommended">Recommended</option>
    <option value="price">Lowest Price</option>
  </select>
</div>
```

#### Drawer/Popover Pattern (Mobile-First)

```jsx
const [isOpen, setIsOpen] = useState(false)

return (
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="px-4 py-2 border border-primary-6 rounded-md text-label1 text-primary-8"
    >
      Filters
    </button>

    {isOpen && (
      <div className="fixed md:absolute bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-auto md:top-full md:mt-2 w-full md:w-80 bg-white border border-primary-6 rounded-t-lg md:rounded-lg shadow-[0px_4px_6px_-2px_rgba(13,15,20,0.1)] p-6 z-50">
        <h3 className="text-heading5 text-primary-13 mb-4">Filter Options</h3>
        {/* Filter controls go here */}
      </div>
    )}
  </div>
)
```

---

### Spacing & Radii

```
Spacing (Tailwind standard, use these values):
  gap-4      16px
  gap-6      24px
  p-4        16px (padding)
  p-6        24px
  px-6       24px (horizontal)
  py-3       12px (vertical)

Border Radius:
  rounded-md    8px  (standard)
  rounded-lg    12px (comfortable)
  rounded-xl    16px
  rounded-full  circle/pill
```

---

### Shadows

```
Card shadow (light):
  shadow-[0px_1px_3px_rgba(13,15,20,0.1),0px_1px_2px_rgba(13,15,20,0.06)]

Modal/drawer shadow (medium):
  shadow-[0px_4px_6px_-2px_rgba(13,15,20,0.1),0px_2px_4px_-2px_rgba(13,15,20,0.06)]

Focus ring:
  focus:ring-2 focus:ring-primary-9/20
```

---

### Complete Example: Flight Search

```jsx
import { useState } from 'react'

export default function FlightSearch() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [travelers, setTravelers] = useState('1')

  return (
    <div className="min-h-screen bg-primary-1">
      {/* Hero */}
      <div className="bg-primary-9 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-heading1 mb-2">Find flights</h1>
          <p className="text-body1 text-primary-2">Compare prices and book instantly</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-[0px_4px_6px_-2px_rgba(13,15,20,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* From */}
            <div className="flex flex-col gap-2">
              <label className="text-label1 text-primary-13 font-semibold">From</label>
              <input
                type="text"
                placeholder="Departure city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="px-4 py-3 border border-primary-6 rounded-md text-body1 text-primary-8 placeholder:text-primary-7 focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20"
              />
            </div>

            {/* To */}
            <div className="flex flex-col gap-2">
              <label className="text-label1 text-primary-13 font-semibold">To</label>
              <input
                type="text"
                placeholder="Destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="px-4 py-3 border border-primary-6 rounded-md text-body1 text-primary-8 placeholder:text-primary-7 focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20"
              />
            </div>

            {/* Travelers */}
            <div className="flex flex-col gap-2">
              <label className="text-label1 text-primary-13 font-semibold">Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="px-4 py-3 border border-primary-6 bg-white rounded-md text-body1 text-primary-8 focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20"
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3+ Travelers</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full px-6 py-3 bg-primary-9 text-white rounded-md text-label1 font-semibold hover:bg-primary-10 active:bg-primary-11 focus:outline-none focus:ring-2 focus:ring-primary-8/30 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white border border-primary-6 rounded-lg hover:shadow-[0px_4px_6px_-2px_rgba(13,15,20,0.1)] transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-heading5 text-primary-13">Direct Flight</p>
                <p className="text-body2 text-primary-8 mt-1">Departs 10:00 AM - 3h 45m</p>
              </div>
              <div className="text-right">
                <p className="text-heading4 text-primary-9">$299</p>
                <button className="mt-2 px-4 py-2 bg-primary-9 text-white rounded-md text-label1 hover:bg-primary-10 transition-colors">
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### Responsive Patterns

#### Mobile-First Grid

```jsx
// Stack on mobile, 2-col on tablet, 3-col on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

#### Hide/Show by Breakpoint

```jsx
// Hidden on mobile, visible from tablet up
<div className="hidden md:block">Desktop sidebar</div>

// Visible on mobile, hidden on tablet+
<div className="md:hidden">Mobile nav</div>
```

#### Text Size Responsive

```jsx
<h2 className="text-heading3 md:text-heading2 text-primary-13">
  Responsive heading
</h2>
```

---

### Quick Copy-Paste Classes

**Input (unfocused):**
```
px-4 py-3 border border-primary-6 rounded-md text-body1 text-primary-8 placeholder:text-primary-7
```

**Input (focused):**
```
focus:outline-none focus:border-primary-9 focus:ring-2 focus:ring-primary-9/20
```

**Button Primary:**
```
px-6 py-3 bg-primary-9 text-white rounded-md text-label1 font-semibold hover:bg-primary-10 active:bg-primary-11 focus:ring-2 focus:ring-primary-8/30 transition-colors
```

**Button Secondary:**
```
px-6 py-3 border border-primary-6 bg-white text-primary-9 rounded-md text-label1 font-semibold hover:bg-primary-1 focus:ring-2 focus:ring-primary-8/30 transition-colors
```

**Card:**
```
p-6 bg-white border border-primary-6 rounded-lg shadow-[0px_1px_3px_rgba(13,15,20,0.1),0px_1px_2px_rgba(13,15,20,0.06)]
```

**Badge Success:**
```
inline-flex items-center px-3 py-1 bg-success-1 text-success-11 rounded-full text-label2
```

---

### Tier 2 Key Rules

- Default text = `text-primary-8`
- Headings = `text-primary-13`
- Always semantic type classes (text-heading1, not text-3xl)
- All colors from tokens (primary-1 to primary-13, status colors)
- Responsive at md (768px) -- use md: prefix for desktop styles
- Focus rings on all interactive elements
- DrawerToPopover for mobile-to-desktop overlays
- Icons via Google Material Symbols (span with `material-symbols-outlined` class)
- Tailwind for structure (flex, grid, gap), Horizon tokens for styling
- No component imports -- just styled HTML/React elements
