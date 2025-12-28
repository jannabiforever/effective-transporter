import { Transport } from "@sveltejs/kit";
import { BigDecimalTransport } from "./big-decimal";
import {
  DateTimeUtcTransport,
  DateTimeZonedTransport,
  TimeZoneNamedTransport,
  TimeZoneOffsetTransport,
} from "./datetime";
import { DurationTransport } from "./duration";
import { EitherTransport } from "./either";
import { HashMapTransport, HashSetTransport } from "./hashed";
import { OptionTransport } from "./option";

/**
 * A whole set of transporters for the Effect library.
 *
 * @example
 * ```src/hooks.ts
 * import { EffectTransport } from "effective-transporter";
 * import type { Transport } from "@sveltejs/kit";
 *
 * const transport: Transport = {
 *   ...EffectTransport,
 *   your_custom_type_transporter: YourCustomTypeTransporter,
 * };
 * ```
 * @description
 * This currently supports the following types:
 * - Option.Option
 * - Either.Either
 * - DateTime.DateTime.Utc
 * - DateTime.DateTime.Zoned
 * - DateTime.TimeZone.Named
 * - DateTime.TimeZone.Offset
 * - Duration.Duration
 *
 * @since 0.1.0
 */
export const EffectTransport: Transport = {
  ...BigDecimalTransport,
  ...DateTimeUtcTransport,
  ...DateTimeZonedTransport,
  ...DurationTransport,
  ...EitherTransport,
  ...HashMapTransport,
  ...HashSetTransport,
  ...OptionTransport,
  ...TimeZoneNamedTransport,
  ...TimeZoneOffsetTransport,
};
