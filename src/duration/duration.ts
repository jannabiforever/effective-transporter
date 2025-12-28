import { Duration } from "effect";
import { TransporterWithGuard } from "../base";
import { Transport } from "@sveltejs/kit";

// ================================================================================
// Duration Transporter
// ================================================================================

/**
 * @internal
 */
export type DurationTransportObject =
  | {
      readonly duration_type: "Millis";
      readonly millis: number;
    }
  | {
      readonly duration_type: "Nanos";
      readonly nanos: bigint;
    }
  | {
      readonly duration_type: "Infinity";
    };

/**
 * @since 0.1.0
 */
export const DurationTransporter = TransporterWithGuard<
  Duration.Duration,
  DurationTransportObject
>({
  guard: Duration.isDuration,
  encode: (duration) => {
    switch (duration.value._tag) {
      case "Infinity":
        return { duration_type: "Infinity" };
      case "Millis":
        return { duration_type: "Millis", millis: duration.value.millis };
      case "Nanos":
        return { duration_type: "Nanos", nanos: duration.value.nanos };
    }
  },
  decode: (object) => {
    switch (object.duration_type) {
      case "Infinity":
        return Duration.infinity;
      case "Millis":
        return Duration.millis(object.millis);
      case "Nanos":
        return Duration.nanos(object.nanos);
    }
  },
});

/**
 * @since 0.1.0
 */
export const DurationTransport: Transport = {
  "effect/duration": DurationTransporter,
};
