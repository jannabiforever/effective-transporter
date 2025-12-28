import { Either } from "effect";
import { TransporterWithGuard } from "../base";
import { Transport } from "@sveltejs/kit";

// ================================================================================
// Either transporter
// ================================================================================

/**
 * @internal
 */
export type EitherTransportObject =
  | {
      either_type: "left";
      left: unknown;
    }
  | {
      either_type: "right";
      right: unknown;
    };

const left = (left: unknown): EitherTransportObject => ({
  either_type: "left",
  left,
});

const right = (right: unknown): EitherTransportObject => ({
  either_type: "right",
  right,
});

/**
 * @since 0.1.0
 */
export const EitherTransporter = TransporterWithGuard<
  Either.Either<unknown, unknown>,
  EitherTransportObject
>({
  guard: Either.isEither,
  encode: Either.match({
    onLeft: left,
    onRight: right,
  }),
  decode: (value) => {
    switch (value.either_type) {
      case "left":
        return Either.left(value.left);
      case "right":
        return Either.right(value.right);
    }
  },
});

/**
 * @since 0.1.0
 */
export const EitherTransport: Transport = {
  "effect/either": EitherTransporter,
};
