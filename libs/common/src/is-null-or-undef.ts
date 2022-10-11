export function isNullOrUndef(x: unknown): x is null | undefined {
  return x === null || x === undefined;
}
