export type LoggerLevel = "info" | "silent" | "error" | "warn" | "verbose";

export type LoggerType = "log" | "info" | "warn" | "error";

export type ArgsArray = any[];

/**
 * Creates A Logger Object, The Log Methods Will Only Trigger If The 
 * Logger Level Is Greater Than Or Equal To The Log Level Of The Method
 */
export default class Logger {
  /**
   * Builds A New Instance Of Logger
   * @param level The Logging Level Of The Logger
 */
  constructor(level?: LoggerLevel);

  public Info(...data: ArgsArray): void;

  public Log(...data: ArgsArray): void;

  public Error(...data: ArgsArray): void;

  public Warn(...data: ArgsArray): void;

  /**
   * Sets A New Logging Level
   * @param level The Logging Level Of The Logger
   */
  public setLevel(level: LoggerLevel): void;

  public readonly level: number;

  public readonly logger_id: string;
}

export type __INTERNAL_LOGGER_INPUT = {
  data: ArgsArray,
  type: LoggerType,
  forceLog: boolean;
};

/**
 * library Internal Loger
 */
export class InternalLogger extends Logger {
  constructor(level?: LoggerLevel);

  public __INTERNAL_LOGGER(input: __INTERNAL_LOGGER_INPUT): void;
}

/**
 * Use This Function To Change The Logging Level Of The Library Internal Logger
 * @param level The Logging Level Of The Library Internal Logger
 */
export function setLevel(level: LoggerLevel): void;