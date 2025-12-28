import { Transport } from "@sveltejs/kit";
import { HashSet } from "effect";
import { TransporterWithGuard } from "../base";

// ================================================================================
// HashSet Transporter
// ================================================================================

/**
 * @internal
 */
export type HashSetTransportObject = ReadonlyArray<unknown>;

/**
 * @since 0.1.0
 */
export const HashSetTransporter = TransporterWithGuard<
  HashSet.HashSet<unknown>,
  HashSetTransportObject
>({
  guard: HashSet.isHashSet,
  encode: (hashSet) => Array.from(hashSet),
  decode: (array) => HashSet.fromIterable(array),
});

/**
 * @since 0.1.0
 */
export const HashSetTransport: Transport = {
  "effect/HashSet/HashSet": HashSetTransporter,
};
