import { Transport } from "@sveltejs/kit";
import { EitherTransport } from "./either";
import { OptionTransport } from "./option";
import {
  DateTimeUtcTransport,
  DateTimeZonedTransport,
  TimeZoneNamedTransport,
  TimeZoneOffsetTransport,
} from "./datetime";
import { DurationTransport } from "./duration";

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
  ...OptionTransport,
  ...EitherTransport,
  ...DateTimeUtcTransport,
  ...DateTimeZonedTransport,
  ...TimeZoneNamedTransport,
  ...TimeZoneOffsetTransport,
  ...DurationTransport,
};
