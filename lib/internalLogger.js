import Logger from './logger.js';

/**
 * Builds A New Instance Of Logger
 * @param {"silent" | "error" | "warn" | "info" | "verbose" } level The Internal Logging Level Of The Global Logger
 */
function InternalLogger(level) {
  Logger.call(this, level);
}

//////////////////////// PROTOTYPE /////////////////////////

InternalLogger.prototype = Object.create(Logger.prototype);

InternalLogger.prototype.__INTERNAL_LOGGER = function ({
  data,
  forceLog,
  type,
  overrideLevel
}) {
  if (data === undefined) return;
  if (!['log', 'warn', 'error', 'info'].includes(type)) throw SyntaxError('Invalid "type". Valid types are \'log\', \'info\', \'warn\' and \'error\'');

  if (forceLog) return console[type].apply(null, (Logger.__logger_handler.apply(null, data)));

  switch (type) {
    case 'info': this.level > (overrideLevel || 2) && console.info.apply(null, (Logger.__logger_handler.apply(null, data))); break;
    case 'log': this.level > (overrideLevel || 2) && console.log.apply(null, (Logger.__logger_handler.apply(null, data))); break;
    case 'warn': this.level > (overrideLevel || 1) && console.warn.apply(null, (Logger.__logger_handler.apply(null, data))); break;
    case 'error': this.level > (overrideLevel || 0) && console.error.apply(null, (Logger.__logger_handler.apply(null, data))); break;
  }
};

////////////////////////////////////////////////////////

/**
 * @type {InternalLogger}
 */
const __internalLogger = window[Symbol.for(__main_logger_private_access_key)] || new InternalLogger('warn');

/**
 * Default Internal Error Logger Function
 * @param {Error} e 
 */
export const err = function (e, overrideLevel) {
  const message = e && e.message;
  const name = e && e.name;
  const additionalInfo = Array.from(arguments).slice(2);
  const oL = overrideLevel || undefined;
  let data = [];
  if (__internalLogger.level === 4) {
    additionalInfo.length && additionalInfo.unshift('\n\n');
    data = additionalInfo.concat(e.stack);
  } else {
    additionalInfo.unshift('\n');
    data = Array.prototype.concat.apply([name + ':', message + '.', '\n'], [additionalInfo.join(' ')]);
  }

  __internalLogger.__INTERNAL_LOGGER({
    data: [data.join(' ')],
    type: 'error',
    forceLog: false,
    overrideLevel: oL
  });
};

/**
 * 
 * @param {string} message 
 * @param {Error} e 
 */
export const warn = function (message, e) {
  if(!message) throw SyntaxError('An argument for \'message\' was not provided');

  const additionalInfo = Array.from(arguments).slice(2);
  let data = [  message ];

  if (__internalLogger.level === 4) {
    additionalInfo.length && additionalInfo.push('\n\n');
    additionalInfo.push(e.stack);
  }
  
  additionalInfo.unshift('\n\n');
  Array.prototype.push.apply(data, [additionalInfo.join(' ')]);  

  __internalLogger.__INTERNAL_LOGGER({
    data: [data.join(' ')],
    type: 'warn',
    forceLog: false
  });
}

export const logf = function () {
  __internalLogger.__INTERNAL_LOGGER({
    data: Array.from(arguments),
    forceLog: true,
    type: 'log'   
  });
}
export const setLevel = __internalLogger.setLevel;
export default InternalLogger;