export type PropKey = string | number | symbol;

/**
 * Does not fully work as a class.
 * 
 * TODO: support both function and class notation in future
 */
export class InvalidConstructorError extends SyntaxError {
  constructor(func: Function);
  constructor(name: string);
  constructor(symbol: symbol);
  constructor(object: object);

  override name: string;
  override toString(): string;
}

export function ToBoolean(x: unknown): boolean;

export function MakeDefaultObjectDescriptor(obj: unknown, options?: PropertyDescriptor | null, usePropAcessors?: boolean): PropertyDescriptorMap;