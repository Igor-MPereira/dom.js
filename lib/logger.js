import { randomBase62Key } from './keys.js';


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
function Logger(level) { // "verbose" in future
  let logLevel = getLogLevel(level);

  Object.defineProperty(this, 'level', {
    get: function () { return logLevel; },
    set: function (value) { throw SyntaxError("'Logger.prototype.level' is read-only, use 'Logger.prototype.setLevel(level)' instead."); },
    configurable: false,
    enumerable: true
  });

  Object.defineProperty(this, 'setLevel', {
    writable: false,
    configurable: false,
    enumerable: true,
    value: (level) => { logLevel = getLogLevel(level); }
  });

  this._isGlobalLogger = !hasGlobalLogger();

  this._logger_id = (!this._isGlobalLogger && ('logger-instance-' + randomBase62Key())) || MAIN_LOGGER_KEY;

  if(this._isGlobalLogger) window[Symbol.for(__main_logger_private_access_key)] = this;
}

////////////////////// Prototype Init /////////////////////////
Logger.prototype = Object.create(null)
Logger.prototype.level = 3;

Logger.prototype.setLevel = function (level) { };

Logger.prototype.Log = function (...data) {

};

Logger.prototype.Warn = function (...data) {

};

Logger.prototype.Error = function (...data) {

};

/**
 * Builds A New Instance Of Logger
 * @param {"silent" | "error" | "warn" | "info" } level The Internal Logging Level Of The Global Logger
 */
function InternalLogger(level) {
  let internalLoggerContructor = Logger.prototype.constructor;

  
}

InternalLogger.prototype = Object.create(Logger.prototype);

console.log(InternalLogger)
console.log(InternalLogger.prototype)

/////////////////////////////////////////////////////////////

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
    case 'info':
    default: return 3;
    // case 'verbose': return 4; in future
  }
}

function hasGlobalLogger() {
  return Symbol.for(MAIN_LOGGER_KEY) in globalThis;
}

const MainLogger = new Logger('warn');

export const setLevel = MainLogger.setLevel;
export default Logger;