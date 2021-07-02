import { isHTMLElement, MakeDefaultObjectDescriptor } from './utils.js';

const __GlobalEventHamdlersMap = {
  /**
   * @type {((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null}
   */
  oncopy: null,
  /**
 * @type {((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null}
 */
  oncut: null,
  /**
 * @type {((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null}
 */
  onpaste: null
};

/**
 * 
 * @param {keyof HTMLElementTagNameMap} tagName 
 * @param {*} options 
 */
function CreateElement(tagName, options) {
  const element = document.createElement(tagName);
  const domJSEl = new DOMJSElement(element, options);
  return domJSEl;
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {*} options 
 */
function DOMJSElement() {

  const element = arguments[0];

  if (!isHTMLElement(element)) throw SyntaxError('\'element\' must be a valid HTMLElement instance.');

  const options = arguments[1];

  let _self = this;

  if (!this) {
    _self = Object.create(DOMJSElement.prototype);
  }
  // throw InvalidConstructorError();

  Object.defineProperty(_self, 'element', {
    value: element.cloneNode(true),
    writable: false,
    enumerable: true,
    configurable: false
  });

  _self[Symbol.toStringTag] = "DOMJSElement";
  _self.toString = function toString() { return Object.prototype.toString.call(_self); };

  return _self;
};


///////////////// PROTOTYPE ///////////////////

const prototype = Object.create(null);

Object.assign(
  prototype,
  MakeDefaultObjectDescriptor(__GlobalEventHamdlersMap, null, true),
  {
    element: {
      configurable: false,
      enumerable: true,
      get: function () { return null; },
      set: function (value) { }
    },
  }
);

DOMJSElement.prototype = Object.create(
  DOMJSElement.prototype,
  prototype
);

DOMJSElement.prototype.toString = function () { return Object.prototype.toString.call(this); };
DOMJSElement.prototype.constructor = DOMJSElement;

///////////////////////////////////////////////

window.__GlobalEventHamdlersMap = window.__GlobalEventHamdlersMap || __GlobalEventHamdlersMap;
window.DOMJSElement = window.DOMJSElement || DOMJSElement;

export {
  CreateElement,
  DOMJSElement
};
