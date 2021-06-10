import { ArgsArray } from '.';

export function err(e: Error, ...additionalInfo: ArgsArray): void;

export function warn(message: string, e?: Error, ...additionalInfo: ArgsArray): void;