# Color audit — Phase 1 of the refactor

Raw hex literals found by grepping every `src/screens/**/*.styles.ts(x)` file
(plus `LandingScreen.tsx`'s inline styles, the only screen without a paired
styles file), mapped to the canonical tokens in
[`src/shared/constants/theme/colors.ts`](../src/shared/constants/theme/colors.ts).

This is a planning artifact, not applied to any screen yet — screens adopt
these tokens when they're migrated in their own phase (Phase 7-11), so each
file is only touched once.

## Brand

| Raw values found | Occurrences | Canonical token | Notes |
|---|---|---|---|
| `#FF8000` | 6 | `colors.primary` | Explicitly named `primary` in 3 separate screens' own local color objects (OrderHistory, ReviewModal, OrderDetail) — clearest signal of intent. |
| `#F29D38` / `#f29d38` | 11 | `colors.primary` | Same brand orange, drifted to a softer/different hex over time (Login, Register, AvailableDate, PassengerDetail, TripOverview). Consolidates into `primary` on migration — a real (minor) visual change, not just a casing fix. |
| `#3A5694` | 11 | `colors.secondary` | Used as-is across TripOverview, PassengerDetail, and others. |
| `#375FA2` | 1 | `colors.secondaryLight` | |
| `#263C54` | 1 | `colors.secondaryDark` | |

## Neutrals

| Raw values found | Canonical token |
|---|---|
| `#000`, `#000000` | `colors.black` |
| `#fff`, `#ffffff`, `#FFFFFF` | `colors.white` |
| `#f9f9f9` | `colors.grey50` |
| `#f5f6fa`, `#f5f5f5`, `#f8f8f8`, `#f8f9fa`, `#f3f4f6` | `colors.grey100` |
| `#f2f2f2`, `#eee`, `#eaeaea` | `colors.grey200` |
| `#e0e0e0`, `#e5e5e5`, `#d9d9d9` | `colors.grey300` |
| `#ccc`, `#cccccc` | `colors.grey400` |
| `#999`, `#999999`, `#b3b3b3`, `#bdbdbd`, `#aaa` | `colors.grey500` |
| `#666`, `#666666`, `#8a8a8a`, `#777`, `#606060`, `#636060` | `colors.grey600` |
| `#333`, `#333333`, `#495057` | `colors.grey700` |
| `#212529`, `#343a40` | `colors.grey800` |

## Semantic

| Raw values found | Occurrences | Canonical token | Notes |
|---|---|---|---|
| `#42CE6D` | 4 | `colors.success` | Confirmed same semantic use as `#28a745` (both used for success/confirmation states — PaymentMethod, PaymentSummary vs OrderStatus, OrderDetail). |
| `#28a745` | 2 | `colors.success` | |
| `#EF4444` | 4 | `colors.error` | Confirmed same semantic use as `#dc3545` (both used for error/cancel/destructive states — AvailableDate, Product vs OrderStatus, OrderDetail, ReviewModal). |
| `#dc3545` | 3 | `colors.error` | |
| `#fd7e14` | 2 | `colors.warning` | |
| `#fbbc04` | 1 | `colors.warning` | |
| `#007bff` | 4 | `colors.info` | |
| `#ebf6ff`, `#e6f2ff` | 2 | `colors.infoBackground` | |
| `#fbebee` | 1 | `colors.errorBackground` | |
| `#eaf7ec` | 1 | `colors.successBackground` | |

## Not consolidated

A long tail of one-off hex values (`#fff3e8`, `#f5c487ff`, `#3c3b3bff`,
`#1609ccff`, `#1203bcb4`, etc.) appear once or twice each, usually as a
specific gradient stop or icon tint. These are evaluated case-by-case during
each screen's migration rather than forced into the palette above — some are
genuinely one-off decorative choices, not a sign of drift.

## Other findings from this audit (not color-related, noted for later phases)

- `assets/images/` (`pana.png`, `amico.png`, `landing-screen-image.png`,
  `Icon-Facebook.png`, `Icon-Google.png`) are **not referenced by any local
  `require()`** — the screens that show these images (`LandingScreen`,
  `LoginScreen`, `RegisterScreen`) load equivalent images from a remote
  Cloudflare R2 URL (`https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/...`)
  instead. The local files are dead weight, candidate for deletion in Phase 14.
- `app.config.js` does not set `icon`, `splash`, or `adaptiveIcon` fields at
  all, so the custom `assets/icon.png` / `assets/splash-icon.png` /
  `assets/adaptive-icon.png` files on disk are currently unused too — the app
  ships with Expo's default icon/splash. Flagged for a product decision, not
  fixed here (out of scope for an architecture refactor).
- `fontWeight: "regular"` / `"semibold"` (found in `HomeScreen.styles.ts`,
  `PassengerDetailScreen.styles.ts`, `TripOverviewScreen.styles.tsx`) are not
  valid React Native `fontWeight` values (only `"normal"`, `"bold"`, and
  `"100"`-`"900"` are) — they silently no-op at runtime instead of erroring.
  Fixed when those screens migrate onto `theme.typography.fontWeight`
  (Phase 8/9).
