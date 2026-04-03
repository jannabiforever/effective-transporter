# ⚠️ Warning

This library is not yet ready for production.

---

# effective-transporter

A utility library that provides SvelteKit transporter hooks for Effect-TS data structures, enabling safe serialization of non-POJO types between server and client.

## Why This Library?

SvelteKit's built-in serialization only handles Plain Old JavaScript Objects (POJOs). When working with Effect-TS, you often use rich data types like `Option`, `Either`, `DateTime`, and `HashMap` that cannot be directly serialized.

This library provides ready-to-use transporters that automatically handle encoding and decoding of Effect-TS types across the server-client boundary using SvelteKit's [transporter hooks](https://svelte.dev/docs/kit/hooks#Transporter-hooks).

## Installation

```bash
pnpm add effective-transporter
```

```bash
npm install effective-transporter
```

```bash
yarn add effective-transporter
```

## Quick Start

In your `src/hooks.ts` or `src/hooks.server.ts`:

```typescript
import { EffectTransport } from "effective-transporter";
import type { Transport } from "@sveltejs/kit";

export const transport: Transport = {
  ...EffectTransport,
  // Add your custom transporters here if needed
};
```

Now you can return Effect-TS types from your server load functions:

```typescript
// src/routes/+page.server.ts
import { Option } from "effect";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    username: Option.some("Alice"),
    email: Option.none(),
  };
};
```

```typescript
// src/routes/+page.svelte
<script lang="ts">
  import { Option } from "effect";

  export let data;
  // data.username and data.email are properly typed as Option<string>
</script>

{#if Option.isSome(data.username)}
  <h1>Welcome, {data.username.value}!</h1>
{/if}
```

## Supported Types

This library provides transporters for the following Effect-TS types:

- **Option**: `Option.Option<A>`
- **Either**: `Either.Either<E, A>`
- **DateTime**:
  - `DateTime.Utc`
  - `DateTime.Zoned`
  - `TimeZone.Named`
  - `TimeZone.Offset`
- **Duration**: `Duration.Duration`
- **BigDecimal**: `BigDecimal.BigDecimal`
- **Collections**:
  - `HashMap.HashMap<K, V>`
  - `HashSet.HashSet<A>`

## Usage Examples

### Option Type

```typescript
// Server
import { Option } from "effect";

export const load = async () => ({
  userPreference: Option.some("dark-mode"),
  unsetValue: Option.none(),
});
```

### Either Type

```typescript
// Server
import { Either } from "effect";

export const load = async () => ({
  result: Either.right({ success: true }),
  error: Either.left("Something went wrong"),
});
```

### DateTime Types

```typescript
// Server
import { DateTime } from "effect";

export const load = async () => ({
  createdAt: DateTime.now(),
  zonedTime: DateTime.nowInCurrentZone(),
});
```

### HashMap and HashSet

```typescript
// Server
import { HashMap, HashSet } from "effect";

export const load = async () => ({
  userRoles: HashSet.fromIterable(["admin", "editor"]),
  metadata: HashMap.fromIterable([
    ["version", "1.0.0"],
    ["env", "production"],
  ]),
});
```

### BigDecimal

```typescript
// Server
import { BigDecimal } from "effect";

export const load = async () => ({
  price: BigDecimal.fromNumber(19.99),
  balance: BigDecimal.make(1234567890n, 2), // 12345678.90
});
```

## API Reference

### `EffectTransport`

A pre-configured `Transport` object containing all supported Effect-TS transporters. Spread this into your SvelteKit hooks configuration.

```typescript
export const transport: Transport = {
  ...EffectTransport,
};
```

### Individual Transporters

If you only need specific transporters, you can import them individually:

```typescript
import {
  OptionTransport,
  EitherTransport,
  DateTimeUtcTransport,
  DateTimeZonedTransport,
  DurationTransport,
  BigDecimalTransport,
  HashMapTransport,
  HashSetTransport,
  TimeZoneNamedTransport,
  TimeZoneOffsetTransport,
} from "effective-transporter";

export const transport: Transport = {
  ...OptionTransport,
  ...EitherTransport,
  // ... only what you need
};
```

### Creating Custom Transporters

You can create your own transporters using the `TransporterWithGuard` helper:

```typescript
import { TransporterWithGuard } from "effective-transporter";
import { MyCustomType } from "./my-types";

export const MyCustomTransporter = TransporterWithGuard<
  MyCustomType,
  { serializedData: string }
>({
  guard: (value): value is MyCustomType => {
    // Type guard logic
    return value instanceof MyCustomType;
  },
  encode: (value) => ({
    serializedData: value.toString(),
  }),
  decode: (obj) => {
    return new MyCustomType(obj.serializedData);
  },
});
```

## How It Works

Each transporter follows a three-step pattern:

1. **Guard**: A type guard function that checks if a value is of the expected type
2. **Encode**: Converts the Effect-TS type to a POJO that can be serialized
3. **Decode**: Reconstructs the Effect-TS type from the serialized POJO on the client

The transporters are registered with SvelteKit using specific keys (e.g., `"effect/Option/Option"`) that match Effect-TS's internal type identifiers.

## Development

### Building

```bash
pnpm build
```

Compiles TypeScript using tsup and outputs ESM format to `dist/` with type definitions and source maps.

### Cleaning

```bash
pnpm clean
```

Removes the `dist/` directory.

## Requirements

- Node.js >= 18
- SvelteKit ^2.11.0
- Effect-TS ^3.19.13

## License

MIT
