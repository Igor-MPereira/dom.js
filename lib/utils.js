import { warn } from './internalLogger.js';

export function InvalidConstructorError(arg) {

  if (!arg) {
    const e = SyntaxError('Invalid \'call\' to constructor object. Use thr \'new\' operator.');
    warn(e, 0, InvalidConstructorError.name + ' was called without any argument. Avoid this behavior.');
    return e;
  }

  switch (typeof arg) {
    case 'symbol':
    case 'string': return SyntaxError('Invalid \'call\' to ' + arg + '. Use the \'new\' Operator.');
    case 'function': return SyntaxError('Invalid \'call\' to ' + arg.name + '. Use the \'new\' Operator.');
    case 'object': return SyntaxError('Invalid \'call\' to ' + (arg.name || arg.toString() || arg.valueOf()) + '. Use the \'new\' Operator.');
  }
}

InvalidConstructorError.prototype = Object.create(
  SyntaxError.prototype,
  {
    name: {
      enumerable: true,
      configurable: false,
      value: InvalidConstructorError.name,
      writable: false
    }
  }
);

InvalidConstructorError.prototype.constructor = InvalidConstructorError;

export function ToBoolean(x) { return Boolean(x); }

/**
 * 
 * @param {any} obj 
 * @param {PropertyDescriptor} overrideDefault 
 */
export function MakeDefaultObjectDescriptor(obj, overrideDefault, uPA) {
  if(!obj || typeof obj !== 'object' || Object.getOwnPropertySymbols(obj.__proto__).includes(Symbol.iterator)) throw new SyntaxError("'obj' must be an object");

  let o = Object.create(null);

  for (const key in obj) {
    let propDescriptor = Object.getOwnPropertyDescriptor(obj, key);

    if (!propDescriptor) continue;

    propDescriptor.enumerable = overrideDefault && overrideDefault.enumerable || true;
    propDescriptor.configurable = overrideDefault && overrideDefault.configurable || false;

    if(uPA) {
      delete propDescriptor.value;
      delete propDescriptor.writable;
    }

    if(Object.prototype.hasOwnProperty.call(propDescriptor, 'writable') && !uPA) {
      propDescriptor.writable = overrideDefault && overrideDefault.writable || false;
    }

    if (Object.prototype.hasOwnProperty.call(propDescriptor, 'value') && !uPA) {
      propDescriptor.value = overrideDefault && overrideDefault.value || propDescriptor.value;
    }

    if (Object.prototype.hasOwnProperty.call(propDescriptor, 'get') || uPA) {
      propDescriptor.get = overrideDefault && overrideDefault.get || propDescriptor.get || function get() { return overrideDefault && overrideDefault.value || propDescriptor.value || null; };
    }

    if (Object.prototype.hasOwnProperty.call(propDescriptor, 'set') || uPA) {
      propDescriptor.set = overrideDefault && overrideDefault.set || propDescriptor.set || function set() { };
    }

    Object.assign(
      o,
      { [key]: propDescriptor }
    );
  }

  return o;
}

export function isHTMLElement(x) {
  const el = x;
  return el instanceof HTMLElement;
}