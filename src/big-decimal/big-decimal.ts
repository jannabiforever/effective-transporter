import { BigDecimal } from "effect";
import { TransporterWithGuard } from "../base";
import { Transport } from "@sveltejs/kit";

// ================================================================================
// BigDecimal Transporter
// ================================================================================

/**
 * @internal
 */
export type BigDecimalTransportObject = {
  value: bigint;
  scale: number;
};

/**
 * @since 0.1.0
 */
export const BigDecimalTransporter = TransporterWithGuard<
  BigDecimal.BigDecimal,
  BigDecimalTransportObject
>({
  guard: BigDecimal.isBigDecimal,
  encode: (bd) => ({
    value: bd.value,
    scale: bd.scale,
  }),
  decode: ({ value, scale }) => BigDecimal.make(value, scale),
});

/**
 * @since 0.1.0
 */
export const BigDecimalTransport: Transport = {
  "effect/BigDecimal": BigDecimalTransporter,
};
