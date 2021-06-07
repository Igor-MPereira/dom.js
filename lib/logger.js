'use strict';

(function () {
  const { randomBase62Key } = require('./keys');
  const MAIN_LOGGER_KEY = 'main-logger-' + randomBase62Key(4);


/**
 * Builds A New Instance Of Logger
 * @param {"silent" | "error" | "warn" | "info" | "verbose"} level The Internal Logging Level Of The Global Logger
 */
function Logger(level = "warn") {

  this.level = level;
  this._logger_id = (hasGlobalLogger() && ('logger-instance-' + randomBase62Key())) || MAIN_LOGGER_KEY;
  this._isGlobalLogger = hasGlobalLogger();
  this.Log = function (...data) {

  };

  this.Warn = function (...data) {

  };

  this.Error = function (...data) {

  };
}

Logger.prototype.__INTERNAL_LOGGER = function ({
  message,
  forceLog,
  type
}) {

};

function handleLoggerInput(...args) {
  const percKeywordMap = {
    c: 'color',
    color: 'color',
    'font-color': 'color',
    bg: 'background'
    };
}

function hasGlobalLogger() {
  return Symbol.for(MAIN_LOGGER_KEY) in globalThis;
}
}) ();