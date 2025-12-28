import { Transport } from "@sveltejs/kit";
import { HashMap } from "effect";
import { TransporterWithGuard } from "../base";

/**
 * @internal
 */
export type HashMapTransportObject = ReadonlyArray<
  Record<string | number | symbol, unknown>
>;

/**
 * @since 0.1.0
 */
export const HashMapTransporter = TransporterWithGuard<
  HashMap.HashMap<unknown, unknown>,
  HashMapTransportObject
>({
  guard: HashMap.isHashMap,
  encode: (map) => Array.from(map).map(([key, value]) => ({ key, value })),
  decode: (array) =>
    HashMap.fromIterable(array.map(({ key, value }) => [key, value])),
});

/**
 * @since 0.1.0
 */
export const HashMapTransport: Transport = {
  "effect/HashMap": HashMapTransporter,
};
