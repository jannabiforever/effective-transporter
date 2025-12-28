import { Option } from "effect";
import { TransporterWithGuard } from "./base";
import type { Transport } from "@sveltejs/kit";

// ================================================================================
// Option transporter
// ================================================================================

/**
 * @internal
 */
export type OptionTransportObject =
  | {
      option_type: "Some";
      value: unknown;
    }
  | {
      option_type: "None";
    };

const some = (value: unknown): OptionTransportObject => ({
  option_type: "Some",
  value,
});

const none = (): OptionTransportObject => ({
  option_type: "None",
});

/**
 * @since 0.1.0
 */
export const OptionTransporter = TransporterWithGuard<
  Option.Option<unknown>,
  OptionTransportObject
>({
  guard: Option.isOption,
  encode: Option.match({
    onNone: none,
    onSome: some,
  }),
  decode: (object) => {
    switch (object.option_type) {
      case "Some":
        return Option.some(object.value);
      case "None":
        return Option.none();
    }
  },
});

/**
 * @since 0.1.0
 */
export const OptionTransport: Transport = {
  "effect/option": OptionTransporter,
};
