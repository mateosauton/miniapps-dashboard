---
version: alpha
name: World Mini Apps UI Kit
description: >
  Official component library for building Mini Apps on World App.
  Package: @worldcoin/mini-apps-ui-kit-react.
  All components integrate with MiniKit haptics, World ID verification,
  and the World App native layer automatically.

colors:
  # Gray scale
  gray-0: "#ffffff"
  gray-50: "#f9fafb"
  gray-100: "#f3f4f5"
  gray-200: "#ebeced"
  gray-300: "#d6d9dd"
  gray-350: "#b1b8c2"
  gray-400: "#9ba3ae"
  gray-500: "#717680"
  gray-700: "#3c424b"
  gray-900: "#181818"

  # Semantic
  success: "#00c230"
  error: "#f2280d"
  warning: "#ffae00"
  info: "#005cff"

  # Brand
  world-blue: "#3fdbec"
  world-blue-surface: "#ecfbfd"
  orange: "#ff5a00"
  purple: "#8600ff"
  green: "#00c230"
  blue: "#005cff"

  # Semantic aliases (preferred names)
  primary: "#181818"
  surface: "#ffffff"
  surface-subtle: "#f9fafb"
  on-surface: "#181818"
  border: "#ebeced"
  border-strong: "#d6d9dd"
  muted: "#9ba3ae"
  neutral: "#717680"

  # Crypto tokens
  wld: "#181818"
  btc: "#ff5a00"
  eth: "#3385ff"
  usdc: "#00c230"

typography:
  display:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em

  headline-lg:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 2.75rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em

  headline-md:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em

  headline-sm:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 2.125rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em

  title-lg:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 1.875rem
    fontWeight: 600
    lineHeight: 1.2

  title-md:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 1.625rem
    fontWeight: 600
    lineHeight: 1.2

  title-sm:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 1.3125rem
    fontWeight: 600
    lineHeight: 1.3

  body-lg:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 1.1875rem
    fontWeight: 400
    lineHeight: 1.5

  body-md:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.5

  body-sm:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5

  label-lg:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 500
    lineHeight: 1.3

  label-md:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.3

  label-sm:
    fontFamily: "TWK Lausanne, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.3

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px
  3xl: 24px
  full: 9999px

spacing:
  base: 4px
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  page: 24px
  section: 40px
  subheadline: 16px
  bottom-button: 32px
  bottom-keyboard: 24px
  bottom-menu: 20px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 3.5rem
    padding: "0 24px"

  button-primary-hover:
    backgroundColor: "{colors.gray-700}"

  button-secondary:
    backgroundColor: "{colors.gray-100}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 3.5rem
    padding: "0 24px"

  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 3.5rem

  button-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 2.5rem
    padding: "0 16px"

  button-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: 2.5rem

  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "0 16px"
    height: 3.5rem
    borderColor: "{colors.border}"

  input-error:
    borderColor: "{colors.error}"
    textColor: "{colors.error}"

  input-valid:
    borderColor: "{colors.success}"

  list-item:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.2xl}"
    height: 4.75rem
    padding: "0 16px"

  top-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.title-sm}"
    height: 4.5rem
    padding: "24px 24px 8px"

  bottom-bar:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    padding: "12px 24px 32px"

  drawer-content:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "16px 24px 40px"

  live-feedback-pending:
    backgroundColor: "{colors.gray-100}"
    textColor: "{colors.gray-500}"

  live-feedback-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.surface}"

  live-feedback-failed:
    backgroundColor: "{colors.error}"
    textColor: "{colors.surface}"

  verification-badge-verified:
    backgroundColor: "{colors.info}"
    textColor: "{colors.surface}"
    size: 1.25rem

  verification-badge-unverified:
    backgroundColor: "{colors.gray-300}"
    textColor: "{colors.surface}"
    size: 1.25rem
---

# World Mini Apps UI Kit — DESIGN.md

## Overview

World Mini Apps are full-screen web experiences embedded inside World App, running on the user's device with access to World ID (proof of humanity), crypto payments (WLD/USDC), and native haptics. The UI Kit provides components that look and feel native to World App.

**Design personality:** Trust-forward. Clean, minimal, high-contrast. Every interaction confirms it is safe and real. No decoration for its own sake — visual weight signals meaning.

**Target audience:** Developers building financial, social, and utility mini-apps for the 10M+ World App users. Users expect fast, familiar flows — think "mobile banking app" clarity, not "web3 dApp" complexity.

**Emotional intent:** Calm confidence. Black-and-white primary palette communicates seriousness and trust. World Blue (`#3fdbec`) used sparingly for identity and verification moments only.

**Baseline constraints:**
- All screens are full-viewport mobile (375–430px wide, variable height)
- Safe area insets must be respected (iOS home bar = `env(safe-area-inset-bottom)`)
- WCAG AA minimum contrast ratio 4.5:1 for all body text
- No skeleton loaders longer than 1.5s — prefer instant renders with progressive data


## Installation & Setup

```bash
npm install @worldcoin/mini-apps-ui-kit-react
```

Required CSS import (design tokens as CSS custom properties):
```ts
// app/layout.tsx or _app.tsx
import "@worldcoin/mini-apps-ui-kit-react/styles.css"
```

For PhoneField and CountryDrawer (optional i18n):
```tsx
// Next.js App Router
import { I18nProvider, loadLocale } from "@worldcoin/mini-apps-ui-kit-react"

const localeData = await loadLocale(locale) // e.g. "en", "es", "fr"
<I18nProvider localeData={localeData}>{children}</I18nProvider>
```

There is **no ThemeProvider** — tokens are injected at `:root` automatically via the CSS import.


## Colors

The palette is intentionally narrow. **Primary** is near-black (`#181818`) on white — maximum contrast, zero ambiguity. Color is reserved for status and brand moments.

- **Primary (`#181818`):** All primary buttons, headings, active states. The dominant ink.
- **Surface (`#ffffff`):** Page background, card background, drawer background.
- **Surface Subtle (`#f9fafb`):** List item backgrounds, input fills, section backgrounds.
- **Border (`#ebeced`):** Default dividers, input outlines, card edges. Whisper-light.
- **Muted (`#9ba3ae`):** Placeholder text, secondary metadata, disabled states.
- **World Blue (`#3fdbec`):** Reserved for World ID verification badges and identity moments only. Do not use as a generic accent.
- **Success (`#00c230`):** Confirmed transactions, verification success, valid states.
- **Error (`#f2280d`):** Destructive actions, failed states, validation errors.
- **Warning (`#ffae00`):** Pending states, non-critical alerts.
- **Info (`#005cff`):** Informational alerts, links.

**Crypto token colors** (for Token component):
- WLD: `#181818` (monochrome)
- BTC: `#ff5a00` (carrot orange)
- ETH: `#3385ff` (blue)
- USDC: `#00c230` (green)


## Typography

Font: **TWK Lausanne** — a geometric sans-serif with optical corrections for small screens. Falls back to system sans-serif stack.

Font weights used: `400` (regular), `500` (medium), `600` (semibold). Do not use 300 (too light on OLED) or 700+ (too aggressive for the calm personality).

Custom scale (differs from standard Tailwind defaults):

| Token | Size | Weight | Use Case |
|---|---|---|---|
| `display` | 56px / 3.5rem | 600 | Hero numbers (balances, large amounts) |
| `headline-lg` | 44px / 2.75rem | 600 | Page titles on landing screens |
| `headline-md` | 40px / 2.5rem | 600 | Section heroes |
| `headline-sm` | 34px / 2.125rem | 600 | Large card headings |
| `title-lg` | 30px / 1.875rem | 600 | Modal titles |
| `title-md` | 26px / 1.625rem | 600 | Screen titles |
| `title-sm` | 21px / 1.3125rem | 600 | TopBar title, card headings |
| `body-lg` | 19px / 1.1875rem | 400 | Prominent body copy |
| `body-md` | 17px / 1.0625rem | 400 | Default body, list labels |
| `body-sm` | 15px / 0.9375rem | 400 | Secondary text, descriptions |
| `label-lg` | 15px / 0.9375rem | 500 | Buttons, tabs, important labels |
| `label-md` | 13px / 0.8125rem | 500 | Small buttons, badges, chips |
| `label-sm` | 11px / 0.6875rem | 500 | Captions, timestamps |

Line heights: `1` (headlines), `1.2` (titles), `1.3` (labels), `1.5` (body).

In Tailwind classes: `text-sm` = 15px (not standard 14px), `text-base` = 17px (not 16px). The scale is shifted up ~2px from standard Tailwind.


## Layout

**Grid:** Single-column, full-width. No multi-column layouts on mobile.

**Page structure (top to bottom):**
```
TopBar          h-[4.5rem]  — fixed or sticky
ScrollContent   flex-1      — overflows vertically, padding: 24px
BottomBar       auto        — fixed to bottom, padding: 12px 24px + safe-area
```

**Spacing scale** (4px base grid):

| Name | Value | Use |
|---|---|---|
| `page` | 24px | Horizontal page padding |
| `section` | 40px | Gap between major sections |
| `subheadline` | 16px | Subheadline to first content item |
| `bottom-button` | 32px | Primary button above iOS home bar |
| `bottom-keyboard` | 24px | Button above active software keyboard |
| `bottom-menu` | 20px | Bottom navigation above iOS bar |

**Container:** Always 100vw with `padding: 0 24px`. No max-width on mobile — components fill the screen.

**Stack rhythm:** Consecutive ListItems have `gap-2` (8px) between them. Sections separated by `gap-10` (40px). Icon-to-label `gap-3` (12px).


## Elevation & Depth

Flat design. **No drop shadows** in the core component set. Depth is conveyed through:

1. **Background tonal contrast** — `surface-subtle (#f9fafb)` for list items against `surface (#ffffff)` page background
2. **Border outlines** — `border (#ebeced)` for cards and inputs
3. **Drawer overlay** — `vaul` drawer uses a scrim (`rgba(0,0,0,0.4)`) behind the sheet

The Drawer is the only component with elevation. Sheet itself has no shadow — rounded top corners (`rounded-t-3xl`) and the scrim communicate layering.

No glassmorphism, no gradients on functional UI, no blurs on interactive elements.


## Shapes

Rounded corners communicate touchability. The scale:

- `rounded-full` (9999px) — **Buttons only.** Pill shape. Every CTA uses this.
- `rounded-3xl` (24px) — Drawer sheet top corners.
- `rounded-2xl` (20px) — ListItem, cards, input containers in floating-label variant.
- `rounded-xl` (16px) — Default Input, Select, TextArea.
- `rounded-lg` (12px) — Chips, badges, small containers.
- `rounded-md` (8px) — Code blocks, tooltips, tiny utility elements.
- `rounded-sm` (4px) — Progress bars, skeleton inner fills.
- `rounded-none` (0px) — Dividers, full-bleed images, BottomBar.

Rule: interactive elements that users tap get more rounding. Decorative/structural elements get less.

Avatar/Marble images: always `rounded-full` with `border-2 border-gray-100 p-[3px]`.


## Components

### Button

**Import:** `import { Button } from "@worldcoin/mini-apps-ui-kit-react"`

**Fires haptic** `impact("light")` automatically on every click — no manual wiring needed.

```tsx
<Button variant="primary" size="lg" fullWidth>
  Confirm Payment
</Button>

<Button variant="secondary" size="sm">
  Cancel
</Button>

<Button variant="primary" size="icon" aria-label="Close">
  <XIcon />
</Button>

{/* Render as <a> tag */}
<Button asChild variant="tertiary">
  <a href="/terms">View Terms</a>
</Button>
```

Props:
```ts
variant?: "primary" | "secondary" | "tertiary"  // default: "primary"
size?: "sm" | "lg" | "icon"                      // default: "lg"
fullWidth?: boolean                               // default: false
asChild?: boolean                                 // renders as child element (Radix Slot)
disabled?: boolean
onClick?: React.MouseEventHandler
```

Sizes: `lg` = h-14 (56px), `sm` = h-10 (40px), `icon` = size-10 (40px square).

**Pattern — Primary action at bottom of screen:**
```tsx
<div className="fixed bottom-0 left-0 right-0 p-6 pb-[calc(24px+env(safe-area-inset-bottom))]">
  <Button fullWidth>Confirm</Button>
</div>
```

---

### Input

**Import:** `import { Input } from "@worldcoin/mini-apps-ui-kit-react"`

```tsx
{/* Default */}
<Input placeholder="Enter amount" type="number" />

{/* Floating label */}
<Input variant="floating-label" label="Email address" type="email" />

{/* With validation */}
<Input
  label="Username"
  error={!!errors.username}
  isValid={!errors.username && touched.username}
  startAdornment={<UserIcon className="size-5 text-gray-400" />}
/>

{/* With prefix/suffix */}
<Input
  startAdornment={<span className="text-gray-500">$</span>}
  showStartDivider
  type="number"
  placeholder="0.00"
/>
```

Props:
```ts
variant?: "default" | "floating-label"
label?: string
error?: boolean
isValid?: boolean
startAdornment?: React.ReactNode
endAdornment?: React.ReactNode
showStartDivider?: boolean   // vertical divider between adornment and input
showEndDivider?: boolean
id?: string                  // auto-generated if omitted
// + all standard HTMLInputAttributes
```

---

### WalletAddressField

**Import:** `import { WalletAddressField } from "@worldcoin/mini-apps-ui-kit-react"`

Extends Input. Includes built-in Paste button (clipboard read) and Clear button.

```tsx
<WalletAddressField
  label="Recipient address"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  isValid={isValidAddress(address)}
  error={address.length > 0 && !isValidAddress(address)}
/>
```

Props: all Input props, plus:
```ts
label?: string           // default: "Wallet address"
pasteButtonLabel?: string // default: "Paste"
```

---

### TopBar

**Import:** `import { TopBar } from "@worldcoin/mini-apps-ui-kit-react"`

```tsx
{/* Title centered between back button and action */}
<TopBar
  title="Send Payment"
  startAdornment={
    <button onClick={() => router.back()}>
      <ChevronLeftIcon className="size-6" />
    </button>
  }
  endAdornment={
    <button onClick={handleClose}>
      <XIcon className="size-6" />
    </button>
  }
/>

{/* Left-aligned title (no startAdornment) */}
<TopBar title="Overview" />
```

Props:
```ts
title?: string
startAdornment?: React.ReactNode
endAdornment?: React.ReactNode
className?: string
```

Height: `h-[4.5rem]` (72px). Padding: `px-6 pt-6 pb-2`. Title centers horizontally when `startAdornment` present; left-aligns otherwise.

---

### BottomBar

**Import:** `import { BottomBar } from "@worldcoin/mini-apps-ui-kit-react"`

```tsx
<BottomBar direction="horizontal">
  <Button fullWidth variant="secondary">Decline</Button>
  <Button fullWidth>Accept</Button>
</BottomBar>

{/* Single full-width button */}
<BottomBar>
  <Button fullWidth>Continue</Button>
</BottomBar>
```

Props:
```ts
direction?: "horizontal" | "vertical"  // default: "horizontal"
// horizontal: CSS grid auto-fills up to 2 cols
// vertical: flex-col-reverse (primary action on top visually = bottom in DOM)
```

Always placed at the bottom of the viewport. Adds safe area padding automatically.

---

### Drawer

**Import:** `import { Drawer } from "@worldcoin/mini-apps-ui-kit-react"`

Built on `vaul`. Compound component — use `Drawer.Trigger`, `Drawer.Content`, etc.

```tsx
<Drawer height="fit">
  <Drawer.Trigger asChild>
    <Button variant="secondary">More options</Button>
  </Drawer.Trigger>

  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Confirm transaction</Drawer.Title>
      <Drawer.Description>Review the details below</Drawer.Description>
    </Drawer.Header>

    <div className="space-y-4 py-4">
      {/* content */}
    </div>

    <BottomBar>
      <Drawer.Close asChild>
        <Button variant="secondary" fullWidth>Cancel</Button>
      </Drawer.Close>
      <Button fullWidth onClick={onConfirm}>Confirm</Button>
    </BottomBar>
  </Drawer.Content>
</Drawer>
```

Props (Drawer root):
```ts
height?: "full" | "fit"         // "full" = full-screen sheet, "fit" = content height
dismissible?: boolean            // default: true — swipe down to dismiss
modal?: boolean                  // default: true
open?: boolean                   // controlled mode
onOpenChange?: (open: boolean) => void
closeThreshold?: number          // default: 0.25 — drag fraction to dismiss
```

Sub-components: `Drawer.Trigger`, `Drawer.Close`, `Drawer.Content`, `Drawer.Header`, `Drawer.Title`, `Drawer.Description`.

---

### ListItem

**Import:** `import { ListItem } from "@worldcoin/mini-apps-ui-kit-react"`

Tappable row. Use inside `<ul>` or as standalone.

```tsx
{/* Navigation row */}
<ListItem
  label="Send money"
  description="Transfer WLD or USDC"
  startAdornment={<CircularIcon><ArrowUpIcon /></CircularIcon>}
  endAdornment={<ChevronRightIcon className="size-5 text-gray-400" />}
  onClick={() => router.push("/send")}
/>

{/* Selection row */}
<ListItem
  label="Bitcoin"
  description="BTC"
  startAdornment={<Token value="BTC" size={40} />}
  endAdornment={selected === "BTC" && <CheckIcon className="size-5 text-success-600" />}
  onClick={() => setSelected("BTC")}
/>
```

Props:
```ts
label?: string
description?: string
startAdornment?: React.ReactNode
endAdornment?: React.ReactNode
disabled?: boolean
onClick?: React.MouseEventHandler
// + Omit<ButtonHTMLAttributes, "onClick">
```

Height: `h-[4.75rem]` (76px). Background: `bg-gray-50`. Rounded: `rounded-2xl`.

---

### Token

**Import:** `import { Token } from "@worldcoin/mini-apps-ui-kit-react"`

Displays crypto token logo.

```tsx
<Token value="WLD" size={40} />
<Token value="USDC" size={32} variant="monochrome" />
<Token value="ETH" size={24} disabled />
```

Props:
```ts
value: "BTC" | "ETH" | "USDC" | "USDT" | "WLD" | "DAI" | "SOL" | "SUI" | "DOGE" | "XRP" | "LINK"
size?: number        // px, default: 40
variant?: "color" | "monochrome"  // default: "color"
disabled?: boolean   // default: false — grays out the logo
```

---

### VerificationBadge

**Import:** `import { VerificationBadge } from "@worldcoin/mini-apps-ui-kit-react"`

World ID human verification status indicator.

```tsx
{/* Beside a username */}
<div className="flex items-center gap-1.5">
  <span className="text-base font-semibold">Alex</span>
  <VerificationBadge verified={isHuman} />
</div>

{/* Larger for hero contexts */}
<VerificationBadge verified={true} className="size-8" />
```

Props:
```ts
verified: boolean    // required
className?: string   // use to override size (default: size-5 = 20px)
```

---

### Marble

**Import:** `import { Marble } from "@worldcoin/mini-apps-ui-kit-react"`

World-generated identity avatar (unique generative image per user).

```tsx
{/* Default (120px) */}
<Marble src={user.marbleUrl} alt={user.name} />

{/* Custom size */}
<Marble src={user.marbleUrl} alt={user.name} className="w-16 h-16" />
```

Props: all `ImgHTMLAttributes`. `src` is required. Default classes: `rounded-full border-2 border-gray-100 p-[3px] aspect-square w-[7.5rem] object-cover`.

---

### LiveFeedback

**Import:** `import { LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react"`

Wraps a Button (or any element) and transforms it into a stateful feedback indicator.
Fires haptics automatically: `notification("success")` or `notification("error")` on state change.

```tsx
const [state, setState] = useState<"pending" | "success" | "failed" | undefined>()

async function handleSubmit() {
  setState("pending")
  try {
    await submitPayment()
    setState("success")
  } catch {
    setState("failed")
    setTimeout(() => setState(undefined), 2000) // reset
  }
}

<LiveFeedback
  state={state}
  label={{ pending: "Sending...", success: "Sent!", failed: "Failed" }}
>
  <Button fullWidth onClick={handleSubmit} disabled={state === "pending"}>
    Send Payment
  </Button>
</LiveFeedback>
```

Props:
```ts
state?: "pending" | "success" | "failed"   // undefined = render children normally
label?: { pending: string; success: string; failed: string }
children: React.ReactNode
className?: string
```

---

### OTPField

**Import:** `import { OTPField } from "@worldcoin/mini-apps-ui-kit-react"`

6-digit input with auto-advance between digits.

```tsx
<OTPField
  value={otp}
  onChange={setOtp}
  onComplete={(code) => verifyCode(code)}
/>
```

---

### PhoneField

**Import:** `import { PhoneField } from "@worldcoin/mini-apps-ui-kit-react"`

Phone number input with country code selector. Requires `I18nProvider`.

```tsx
<PhoneField
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
/>
```

---

### Tabs

**Import:** `import { Tabs } from "@worldcoin/mini-apps-ui-kit-react"`

Horizontal tab strip with animated underline.

```tsx
<Tabs value={tab} onValueChange={setTab}>
  <Tabs.List>
    <Tabs.Trigger value="send">Send</Tabs.Trigger>
    <Tabs.Trigger value="receive">Receive</Tabs.Trigger>
    <Tabs.Trigger value="history">History</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="send"><SendPanel /></Tabs.Content>
  <Tabs.Content value="receive"><ReceivePanel /></Tabs.Content>
  <Tabs.Content value="history"><HistoryPanel /></Tabs.Content>
</Tabs>
```

---

### Progress

**Import:** `import { Progress } from "@worldcoin/mini-apps-ui-kit-react"`

```tsx
<Progress value={75} max={100} />
```

---

### Skeleton

**Import:** `import { Skeleton } from "@worldcoin/mini-apps-ui-kit-react"`

Shimmer placeholder. Shape controlled entirely by className.

```tsx
{/* List item skeleton */}
<Skeleton className="h-[76px] rounded-2xl w-full" />

{/* Avatar */}
<Skeleton className="size-12 rounded-full" />

{/* Text line */}
<Skeleton className="h-4 rounded w-2/3" />
```

---

### AlertDialog

**Import:** `import { AlertDialog } from "@worldcoin/mini-apps-ui-kit-react"`

For destructive or irreversible actions. Blocks interaction until resolved.

```tsx
<AlertDialog>
  <AlertDialog.Trigger asChild>
    <Button variant="tertiary">Delete account</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Title>Delete account?</AlertDialog.Title>
    <AlertDialog.Description>
      This action cannot be undone.
    </AlertDialog.Description>
    <AlertDialog.Cancel asChild>
      <Button variant="secondary" fullWidth>Cancel</Button>
    </AlertDialog.Cancel>
    <AlertDialog.Action asChild>
      <Button fullWidth onClick={deleteAccount}>Delete</Button>
    </AlertDialog.Action>
  </AlertDialog.Content>
</AlertDialog>
```

---

### CircularIcon

**Import:** `import { CircularIcon } from "@worldcoin/mini-apps-ui-kit-react"`

Circular container for an icon, used as `startAdornment` in ListItem or standalone.

```tsx
<CircularIcon className="bg-gray-100">
  <ArrowUpIcon className="size-5" />
</CircularIcon>
```

---

### CircularState

**Import:** `import { CircularState } from "@worldcoin/mini-apps-ui-kit-react"`

Animated loading / success / error circle.

```tsx
<CircularState state="success" />   // animated checkmark
<CircularState state="pending" />   // spinning loader
<CircularState state="failed" />    // X mark
```

---

### Chip / Pill

**Import:** `import { Chip, Pill } from "@worldcoin/mini-apps-ui-kit-react"`

```tsx
{/* Dismissible chip */}
<Chip onClose={() => removeTag(tag)}>{tag}</Chip>

{/* Status pill */}
<Pill variant="success">Verified</Pill>
<Pill variant="warning">Pending</Pill>
<Pill variant="error">Failed</Pill>
```


## Common Patterns

### Full-screen payment flow

```tsx
export default function SendPage() {
  const [state, setState] = useState<"idle" | "pending" | "success">("idle")

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar
        title="Send WLD"
        startAdornment={<BackButton />}
      />

      <main className="flex-1 px-6 py-4 space-y-4">
        <Input
          variant="floating-label"
          label="Amount"
          type="number"
          startAdornment={<Token value="WLD" size={24} />}
          showStartDivider
        />
        <WalletAddressField label="To" />
      </main>

      <BottomBar>
        <LiveFeedback
          state={state === "pending" ? "pending" : state === "success" ? "success" : undefined}
          label={{ pending: "Sending...", success: "Sent!", failed: "Failed" }}
        >
          <Button fullWidth onClick={handleSend}>
            Send
          </Button>
        </LiveFeedback>
      </BottomBar>
    </div>
  )
}
```

### Confirmation drawer

```tsx
<Drawer height="fit">
  <Drawer.Trigger asChild>
    <Button fullWidth>Review & Confirm</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Confirm payment</Drawer.Title>
    </Drawer.Header>
    <ul className="space-y-2 py-4">
      <ListItem label="Amount" endAdornment={<span>10 WLD</span>} />
      <ListItem label="Fee" endAdornment={<span>0.01 WLD</span>} />
      <ListItem label="Total" endAdornment={<span className="font-semibold">10.01 WLD</span>} />
    </ul>
    <BottomBar direction="horizontal">
      <Drawer.Close asChild>
        <Button variant="secondary" fullWidth>Cancel</Button>
      </Drawer.Close>
      <Button fullWidth>Confirm</Button>
    </BottomBar>
  </Drawer.Content>
</Drawer>
```

### Identity verification row

```tsx
<ListItem
  label={user.name}
  description={user.isHuman ? "World ID verified" : "Unverified"}
  startAdornment={<Marble src={user.marbleUrl} alt={user.name} className="w-12 h-12" />}
  endAdornment={<VerificationBadge verified={user.isHuman} />}
/>
```

### Loading state

```tsx
function TransactionList({ loading, txs }) {
  if (loading) return (
    <ul className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[76px] rounded-2xl w-full" />
      ))}
    </ul>
  )
  return (
    <ul className="space-y-2">
      {txs.map(tx => <ListItem key={tx.id} label={tx.label} description={tx.date} />)}
    </ul>
  )
}
```


## Do's and Don'ts

**Do:**
- Use `Button variant="primary"` for every screen's single most important action
- Add `fullWidth` to bottom CTA buttons — full-width taps are easier on mobile
- Use `LiveFeedback` on any button that triggers an async operation
- Use `Drawer height="fit"` for confirmations and short forms (not full-screen)
- Use `Drawer height="full"` for complex flows with scrolling content
- Keep TopBar titles under 20 characters — they center between adornments
- Use `Skeleton` components that match the exact shape of the content they replace
- Wrap `PhoneField` and `CountryDrawer` with `I18nProvider`
- Respect `env(safe-area-inset-bottom)` in fixed bottom elements
- Maintain WCAG AA contrast: 4.5:1 for body text, 3:1 for large text (18px+ bold)

**Don't:**
- Don't use World Blue (`#3fdbec`) for anything except World ID verification indicators
- Don't use more than one `variant="primary"` button visible at the same time
- Don't add custom `box-shadow` — elevation is conveyed through background tones
- Don't use `rounded` values not in the scale above — mixing breaks visual rhythm
- Don't use font weight 300 (too light for OLED) or 800+ (breaks brand personality)
- Don't put more than 2 buttons in a `BottomBar` — use a `Drawer` for more options
- Don't use `text-2xs` (11px) for body copy — only for timestamps and legal microcopy
- Don't render `Marble` without a fallback `alt` text — accessibility requirement
- Don't bypass `LiveFeedback` haptics with manual `MiniKit.commandsAsync.sendHapticFeedback` calls on button taps — `Button` already fires them
- Don't use CSS gradients on interactive surfaces — reserved for decorative/illustration contexts only
