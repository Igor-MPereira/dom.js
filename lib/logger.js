'use strict';

(function () {
  /////////          PRELOAD          //////////

  require('./regex');

  //////////////////////////////////////////////

  const { randomBase62Key } = require('./keys');
  
  const MAIN_LOGGER_KEY = 'main-logger-' + randomBase62Key(4);
  window.__main_logger_access_key = MAIN_LOGGER_KEY;
  const COLOR_PROP = 'color';
  const BACKGROUND_PROP = 'background';

  /**
   * Builds A New Instance Of Logger
   * @param {"silent" | "error" | "warn" | "info" | "verbose"} level The Internal Logging Level Of The Global Logger
   */
  function Logger(level = "warn") {

    this.level = level;
    this._logger_id = ( hasGlobalLogger() && ( 'logger-instance-' + randomBase62Key() ) ) || MAIN_LOGGER_KEY;
    this._isGlobalLogger = hasGlobalLogger();
    this.Log = function (...data) {

    };

    this.Warn = function (...data) {

    };

    this.Error = function (...data) {

    };
  }

  Logger.prototype.__INTERNAL_LOGGER = function ({
    data,
    forceLog,
    type
  }) {
    if(forceLog) return console[type](handleLoggerInput(...data));
    
    switch(type) {
      case 'log':
        !['silent','error','warn'].includes(this.level) && console.log(handleLoggerInput(...data))
      case 'warn':
        !['silent','error'].includes(this.level) && console.warn(handleLoggerInput(...data))
      case 'error':
        this.level !== 'silent' && console.error(handleLoggerInput(...data))
    }
  };

  function handleLoggerInput(...args) {
    /* const percKeywordMap = {
      c: COLOR_PROP,
      color: COLOR_PROP,
      'font-color': COLOR_PROP,
      bg: BACKGROUND_PROP,
      background: BACKGROUND_PROP,
      'background-color': BACKGROUND_PROP
    }; */
    /* In future, this function will treat styling */

    return args;
  }

  function hasGlobalLogger() {
    return Symbol.for(MAIN_LOGGER_KEY) in globalThis;
  }
})();