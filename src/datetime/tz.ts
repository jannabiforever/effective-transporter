import { DateTime, Option } from "effect";
import { TransporterWithGuard } from "../base";
import { Transport } from "@sveltejs/kit";

// ================================================================================
// TimeZone.Offset transporter
// ================================================================================

/**
 * @internal
 */
export interface TimeZoneOffsetTransportObject {
  offset: number;
}

/**
 * @since 0.1.0
 */
export const TimeZoneOffsetTransporter = TransporterWithGuard<
  DateTime.TimeZone.Offset,
  TimeZoneOffsetTransportObject
>({
  guard: DateTime.isTimeZoneOffset,
  encode: (tz) => ({ offset: tz.offset }),
  decode: (obj) => DateTime.zoneMakeOffset(obj.offset),
});

/**
 * @since 0.1.0
 */
export const TimeZoneOffsetTransport: Transport = {
  "effect/DateTime/TimeZone/Offset": TimeZoneOffsetTransporter,
};

// ================================================================================
// TimeZone.Named transporter
// ================================================================================

/**
 * @internal
 */
export interface TimeZoneNamedTransportObject {
  id: string;
}

/**
 * @since 0.1.0
 */
export const TimeZoneNamedTransporter = TransporterWithGuard<
  DateTime.TimeZone.Named,
  TimeZoneNamedTransportObject
>({
  guard: DateTime.isTimeZoneNamed,
  encode: (tz) => ({ id: tz.id }),
  decode: (obj) => DateTime.zoneMakeNamed(obj.id).pipe(Option.getOrThrow), // asserted to be some.
});

/**
 * @since 0.1.0
 */
export const TimeZoneNamedTransport: Transport = {
  "effect/DateTime/TimeZone/Named": TimeZoneNamedTransporter,
};
