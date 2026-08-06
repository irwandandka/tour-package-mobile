# Tour Package Mobile

A tour-booking mobile app built with Expo/React Native — browse tour packages,
book a trip (rooms, passengers, payment), and manage orders.

## Tech stack

- **Expo SDK 54** / React Native 0.81 / React 19, TypeScript (strict)
- **React Navigation v7** — single native-stack `RootNavigator`
- **Zustand** — client/UI state (`authStore`, `bookingStore`, `settingsStore`)
- **TanStack Query** — server state, caching, and polling
- **React Hook Form + Zod** — forms and validation
- **i18next / react-i18next** — 7 locales (en, id, de, ja, ko, th, zh-CN)
- **Jest + @testing-library/react-native** — unit tests for business logic
- **expo-image**, **expo-secure-store**, **expo-splash-screen**

## Getting started

Requires Node ≥ 20.19.4.

```bash
npm install
cp .env.example .env   # fill in API_BASE_URL / API_KEY / etc.
npm start               # or: npm run ios / npm run android
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run ios` / `npm run android` | Start the dev server for a specific platform |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `expo lint` |
| `npm run format` / `npm run format:check` | Prettier write / check |
| `npm test` | Run the Jest unit-test suite |

CI (`.github/workflows/ci.yml`) runs typecheck, lint, and test on every PR
into `main` and on every push to `main`.

## Project structure

Feature-based: each business domain owns its screens, API calls, and
domain-specific state; cross-cutting code lives under `src/shared/`.

```
src/
├── app/providers/       # AppProviders: SafeAreaProvider, ErrorBoundary, QueryClientProvider
├── navigation/           # RootNavigator, per-area typed param lists (navigation/types.ts)
├── features/
│   ├── auth/             # Landing, Login, Register — authStore, schemas, api
│   ├── discovery/        # Home (sections/, hooks/)
│   ├── catalog/          # Product, AvailableDate
│   ├── booking/          # TripOverview → PassengerDetail → PaymentMethod →
│   │                      # PaymentSummary → PaymentQR → OrderStatus
│   │                      # bookingStore, pricingCalculator, passengerGenerator
│   ├── orders/           # OrderHistory, OrderDetail, ReviewModal, StatusBadge
│   └── profile/          # Profile, Language, TermCondition
├── shared/
│   ├── components/        # Button, TextField, Screen, ErrorBoundary, OfflineBanner, ...
│   ├── hooks/              # useCountryCity, useNetworkStatus
│   ├── utils/               # formatCurrency, statusColor, getApiErrorMessage (+ tests)
│   ├── api/                  # typed axios client, apiService, ApiResponse<T>
│   ├── constants/theme/       # design tokens: colors, spacing, typography, radii, shadows
│   └── types/                  # domain models
├── i18n/                  # i18next setup + locales/ (7 languages)
└── store/                  # settingsStore (language/currency)
```

## Testing

Unit tests are co-located with their source as `*.test.ts` and cover
business logic only (pricing/passenger-generation calculators, formatters,
Zod schemas, error-message extraction) — not full screen integration tests.
Run with `npm test`.

## Environment variables

See `.env.example` for the full list (`API_BASE_URL`, `API_DEVELOPMENT`,
`API_KEY`, `APP_NAME`, `APP_SLUG`, `APP_SCHEME`, `IOS_BUNDLE_ID`).
