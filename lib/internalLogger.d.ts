import { ArgsArray } from '.';

export function err(e: Error, overrideLevel?: number | null, ...additionalInfo: ArgsArray): void;

export function warn(message: string, e?: Error, ...additionalInfo: ArgsArray): void;