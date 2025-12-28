import { DateTime } from "effect";
import { TransporterWithGuard } from "../base";
import { Transport } from "@sveltejs/kit";

// ================================================================================
// DateTime.Utc transporter
// ================================================================================

/**
 * @internal
 */
export interface DateTimeUtcTransportObject {
  epochMillis: number;
}

const DateTimeUtcGuard = (value: unknown): value is DateTime.Utc =>
  DateTime.isDateTime(value) && DateTime.isUtc(value);

/**
 * @since 0.1.0
 */
export const DateTimeUtcTransporter = TransporterWithGuard<
  DateTime.Utc,
  DateTimeUtcTransportObject
>({
  guard: DateTimeUtcGuard,
  encode: (value: DateTime.Utc) => ({
    epochMillis: value.epochMillis,
  }),
  decode: (value: DateTimeUtcTransportObject) =>
    DateTime.unsafeMake(value.epochMillis),
});

/**
 * @since 0.1.0
 */
export const DateTimeUtcTransport: Transport = {
  "effect/datetime/utc": DateTimeUtcTransporter,
};

// ================================================================================
// DateTime.Zoned transporter
// ================================================================================

/**
 * @internal
 */
export interface DateTimeZonedTransportObject {
  epochMillis: number;
  /**
   * Note that `DateTime.TimeZone` is not a POJO.
   * But it is transportable, because timezone-transporter is implemented.
   */
  timeZone: DateTime.TimeZone;
}

const DateTimeZonedGuard = (value: unknown): value is DateTime.Zoned =>
  DateTime.isDateTime(value) && DateTime.isZoned(value);

/**
 * @since 0.1.0
 */
export const DateTimeZonedTransporter = TransporterWithGuard<
  DateTime.Zoned,
  DateTimeZonedTransportObject
>({
  guard: DateTimeZonedGuard,
  encode: (value: DateTime.Zoned) => ({
    epochMillis: value.epochMillis,
    timeZone: value.zone,
  }),
  decode: (value: DateTimeZonedTransportObject) =>
    DateTime.unsafeMakeZoned(value.epochMillis, {
      timeZone: value.timeZone,
    }),
});

/**
 * @since 0.1.0
 */
export const DateTimeZonedTransport: Transport = {
  "effect/datetime/zoned": DateTimeZonedTransporter,
};
