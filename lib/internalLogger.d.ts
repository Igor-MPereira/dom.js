import { ArgsArray, LoggerLevel } from '.';
import Logger from './logger';

export function err(e: Error, overrideLevel?: number | null, ...additionalInfo: ArgsArray): void;

export function warn(message: string, e?: Error, ...additionalInfo: ArgsArray): void;

/**
 * Forces A Log Message
 * @param data Data to be logged
 */
export function logf(...data: ArgsArray): void;
export type __INTERNAL_LOGGER_INPUT = {
  data: ArgsArray,
  type: LoggerType,
  forceLog?: boolean;
  overrideLevel?: number;
};

/**
 * library Internal Loger
 */
export default class InternalLogger extends Logger {
  constructor(level?: LoggerLevel);

  public __INTERNAL_LOGGER(input: __INTERNAL_LOGGER_INPUT): void;
}

/**
 * Use This Function To Change The Logging Level Of The Library Internal Logger
 * @param level The Logging Level Of The Library Internal Logger
 */
export function setLevel(level: LoggerLevel): void;