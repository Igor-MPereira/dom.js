import { InternalLogger } from './index.js';

/**
 * @type {InternalLogger}
 */
const __internalLogger = window[Symbol.for(__main_logger_private_access_key)];

/**
 * Default Internal Error Logger Function
 * @param {Error} e 
 */
const err = function (e) {
  const message = e && e.message;
  const name = e && e.name;
  const additionalInfo = Array.from(arguments).slice(1);

  let data = [];
  if (__internalLogger.level === 4) {
    additionalInfo.length && additionalInfo.push('\n\n');
    data = additionalInfo.concat(e.stack);
  } else {
    data = Array.prototype.concat.apply([name + ':', message + '.', '\n'], additionalInfo);
  }

  __internalLogger.__INTERNAL_LOGGER({
    data,
    type: 'error',
    forceLog: false
  });
};

/**
 * 
 * @param {string} message 
 * @param {Error} e 
 */
const warn = function (message, e) {
  if(!message) throw SyntaxError('An argument for \'message\' was not provided');

  const additionalInfo = Array.from(arguments).slice(2);
  let data = [  message ];

  if (__internalLogger.level === 4) {
    additionalInfo.length && additionalInfo.push('\n\n');
    additionalInfo.push(e.stack);
  }

  data.push(additionalInfo);

  __internalLogger.__INTERNAL_LOGGER({
    data,
    type: 'warn',
    forceLog: false
  });
}

export {
  err,
  warn
}