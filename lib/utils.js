import { warn } from './internalLogger.js';

export function InvalidConstructorError(arg) {

  if(!arg) {
    const e = SyntaxError('Invalid \'call\' to constructor object. Use thr \'new\' operator.');
    warn(e, 0, InvalidConstructorError.name + ' was called without any argument. Avoid this behavior.');
    return e;
  }

  switch(typeof arg) {
    case 'symbol':
    case 'string':   return SyntaxError('Invalid \'call\' to ' + arg + '. Use the \'new\' Operator.');
    case 'function': return SyntaxError('Invalid \'call\' to ' + arg.name + '. Use the \'new\' Operator.');
    case 'object':   return SyntaxError('Invalid \'call\' to ' + (arg.name || arg.toString()) + '. Use the \'new\' Operator.');
  }
}

export function ToBoolean(x) { return Boolean(x); }