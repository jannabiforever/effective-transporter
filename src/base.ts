import { type Transporter } from "@sveltejs/kit";

/**
 * @template T - the internal type. In most cases, this is not POJO, so we need a transporter.
 * @template V - the transportable type. This *must* be a POJO / transportable object.
 *
 * @param param.guard - A function that checks if the value is of the expected type.
 * @param param.encoder - A function that encodes the value into a transportable format.
 * @param param.decoder - A function that decodes the value from a transportable format.
 * @returns A transporter that encodes and decodes values using the provided functions.
 */
export const TransporterWithGuard = <T, V>({
  guard,
  encode,
  decode,
}: {
  guard: (value: unknown) => value is T;
  encode: (value: T) => V;
  decode: (value: V) => T;
}): Transporter<T, V> => {
  return {
    encode: (value: T) => guard(value) && encode(value),
    decode,
  };
};
