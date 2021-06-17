import { randomBase62Key } from './keys.js';
import { InvalidConstructorError } from './utils.js';


const MAIN_LOGGER_KEY = 'main-logger-' + randomBase62Key(4);
Object.defineProperty(window, '__main_logger_private_access_key', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: MAIN_LOGGER_KEY
});
const COLOR_PROP = 'color';
const BACKGROUND_PROP = 'background';

/**
 * Builds A New Instance Of Logger              
 * @param {"silent" | "error" | "warn" | "info" } level The Internal Logging Level Of The Global Logger
 */
export default function Logger(level) { // "verbose" in future

  if (!this) throw InvalidConstructorError(Logger);

  let logLevel = getLogLevel(level);

  Object.defineProperty(this, 'level', {
    get: function () { return logLevel; },
    set: function (value) { throw SyntaxError("'Logger.prototype.level' is read only, use 'Logger.prototype.setLevel(level)' instead."); },
    configurable: false,
    enumerable: true
  });

  Object.defineProperty(this, 'setLevel', {
    writable: false,
    configurable: false,
    enumerable: true,
    value: function (level) { logLevel = getLogLevel(level); }
  });

  this._isGlobalLogger = !hasGlobalLogger();

  Object.defineProperty(this, 'logger_id', {
    writable: false,
    configurable: false,
    enumerable: true,
    value: (!this._isGlobalLogger && ('logger-instance-' + randomBase62Key())) || MAIN_LOGGER_KEY
  });

  if (this._isGlobalLogger) window[Symbol.for(__main_logger_private_access_key)] = this;
}

////////////////////// Prototype Init /////////////////////////
Logger.prototype = Object.create(null);
Logger.prototype.level = 3;

Logger.prototype.setLevel = function (level) { };

Logger.prototype.Log = function () {
  this.level > 2 && console.log.apply(null, (handleLoggerInput.apply(null, arguments)));
};

Logger.prototype.Warn = function () {
  this.level > 1 && console.warn.apply(null, (handleLoggerInput.apply(null, arguments)));
};

Logger.prototype.Error = function () {
  this.level > 0 && console.error.apply(null, (handleLoggerInput.apply(null, arguments)));
};

Logger.prototype.Info = function () {
  this.level > 2 && console.log.apply(null, (handleLoggerInput.apply(null, arguments)));
};

/////////////////////////////////////////////////////////////

Logger.__logger_handler = handleLoggerInput;

function handleLoggerInput() {
  /* const percKeywordMap = {
    c: COLOR_PROP,
    color: COLOR_PROP,
    'font-color': COLOR_PROP,
    bg: BACKGROUND_PROP,
    background: BACKGROUND_PROP,
    'background-color': BACKGROUND_PROP
  }; */

  /* In future, this function will treat styling */

  return arguments;
}

function getLogLevel(lvl) {
  switch (lvl) {
    case 'silent': return 0;
    case 'error': return 1;
    case 'warn': return 2;
    case 'info': return 3;
    case 'verbose': return 4;
    default: return 3;
  }
}

function hasGlobalLogger() {
  return Symbol.for(MAIN_LOGGER_KEY) in globalThis;
}