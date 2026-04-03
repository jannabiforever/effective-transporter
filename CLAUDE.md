# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library that provides SvelteKit transporter hooks for Effect-TS data structures. Transporters enable safe serialization of non-POJO (Plain Old JavaScript Object) types between server and client in SvelteKit applications.

**Status**: Not yet production-ready (as noted in README.md)

## Commands

### Build
```bash
pnpm build
```
Compiles TypeScript using tsup, outputs to `dist/` with ESM format, types, and sourcemaps.

### Clean
```bash
pnpm clean
```
Removes the `dist/` directory.

## Architecture

### Core Pattern: TransporterWithGuard

All transporters follow a common pattern defined in `src/base.ts`:

```typescript
TransporterWithGuard<T, V>({
  guard: (value: unknown) => value is T,  // Type guard for internal type
  encode: (value: T) => V,                // Encode to transportable format
  decode: (value: V) => T,                // Decode from transportable format
})
```

- **T**: Internal (non-POJO) type from Effect-TS
- **V**: Transportable (POJO) representation

### Transporter Keys

Each transporter is registered in a `Transport` object with a specific key format:
- `"effect/Option/Option"` for Option types
- `"effect/Either/Either"` for Either types
- `"effect/HashMap/HashMap"` for HashMap types
- `"effect/DateTime/DateTime/Utc"` for DateTime.Utc
- `"effect/DateTime/DateTime/Zoned"` for DateTime.Zoned
- Similar patterns for Duration, HashSet, BigDecimal, and TimeZone types

### Module Organization

Each supported type has its own directory under `src/`:
- `option/` - Effect Option type
- `either/` - Effect Either type
- `datetime/` - DateTime.Utc and DateTime.Zoned
- `duration/` - Duration type
- `hashed/` - HashMap and HashSet types
- `big-decimal/` - BigDecimal type

Each module exports:
1. A `*Transporter` using `TransporterWithGuard`
2. A `*Transport` object with the registered transporter
3. Internal transport object type definitions (marked `@internal`)

### Main Export: EffectTransport

`src/collect.ts` aggregates all individual transports into a single `EffectTransport` object that can be spread into a SvelteKit hooks configuration:

```typescript
const transport: Transport = {
  ...EffectTransport,
  your_custom_type_transporter: YourCustomTypeTransporter,
};
```

## Adding New Transporters

When adding support for a new Effect-TS type:

1. Create a new directory under `src/` (e.g., `src/newtype/`)
2. Define the transportable POJO type (mark as `@internal`)
3. Create the transporter using `TransporterWithGuard`:
   - Provide a type guard (use Effect's built-in guards when available)
   - Implement encoder (convert to POJO)
   - Implement decoder (reconstruct from POJO)
4. Export a `Transport` object with the appropriate key
5. Add the transport to `EffectTransport` in `src/collect.ts`
6. Re-export from `src/index.ts`

## Dependencies

- **Runtime**: None (peer dependencies only)
- **Peer Dependencies**:
  - `@sveltejs/kit ^2.11.0`
  - `effect ^3.19.13`
- **Build Tools**: tsup, TypeScript 5.4+
- **Package Manager**: pnpm

## Type Safety

All transporters are fully typed with TypeScript. The library exports both runtime values and type definitions. Transport object types are marked `@internal` and should not be used directly by consumers.
