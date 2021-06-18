export type PropKey = string | number | symbol;
 
export function InvalidConstructorError(func: Function): SyntaxError;
export function InvalidConstructorError(name: string): SyntaxError;
export function InvalidConstructorError(symbol: symbol): SyntaxError;
export function InvalidConstructorError(object: object): SyntaxError;

export function ToBoolean(x: unknown): boolean;
